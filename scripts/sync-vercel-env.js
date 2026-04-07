const fs = require('fs');
const path = require('path');
const https = require('https');

// Load .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    env[match[1].trim()] = match[2].trim().replace(/^"|"$/g, '');
  }
});

const token = env.VERCEL_OIDC_TOKEN;
if (!token) {
  console.error('❌ VERCEL_OIDC_TOKEN non trouvé dans .env.local');
  process.exit(1);
}

// Recherche du projet par nom
function searchProject(projectName) {
  return new Promise((resolve, reject) => {
    const url = `https://api.vercel.com/v9/projects?teamId=undefined&limit=100`;
    https.get(url, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          return;
        }
        const projects = JSON.parse(data).projects;
        const project = projects.find(p => p.name === projectName);
        resolve(project?.id || null);
      });
    }).on('error', reject);
  });
}

// Ajouter ou mettre à jour une variable d'environnement
function upsertEnv(projectId, key, value) {
  return new Promise((resolve, reject) => {
    // D'abord, vérifier si elle existe
    const getUrl = `https://api.vercel.com/v9/project/${projectId}/env?limit=100`;
    https.get(getUrl, {
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        if (res.statusCode !== 200) {
          reject(new Error(`GET env failed: ${res.statusCode} ${data}`));
          return;
        }
        const envs = JSON.parse(data).envs;
        const existing = envs.find(e => e.key === key);
        if (existing) {
          // Update
          const updateUrl = `https://api.vercel.com/v9/project/${projectId}/env/${existing.id}`;
          const payload = JSON.stringify({ value, type: 'plain' });
          https.request(updateUrl, {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Content-Length': payload.length
            }
          }, (resp) => {
            let rdata = '';
            resp.on('data', c => rdata += c);
            resp.on('end', () => {
              if (resp.statusCode === 200) {
                console.log(`✅ ${key} mis à jour`);
                resolve();
              } else {
                reject(new Error(`PATCH failed: ${resp.statusCode} ${rdata}`));
              }
            });
          }).write(payload).end();
        } else {
          // Create
          const createUrl = `https://api.vercel.com/v9/project/${projectId}/env`;
          const payload = JSON.stringify({ key, value, type: 'plain' });
          https.request(createUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Content-Length': payload.length
            }
          }, (resp) => {
            let rdata = '';
            resp.on('data', c => rdata += c);
            resp.on('end', () => {
              if (resp.statusCode === 200 || resp.statusCode === 201) {
                console.log(`✅ ${key} créé`);
                resolve();
              } else {
                reject(new Error(`POST failed: ${resp.statusCode} ${rdata}`));
              }
            });
          }).write(payload).end();
        }
      });
    }).on('error', reject);
  });
}

// Exécution
(async () => {
  try {
    const projectName = 'trottinette-freestyle';
    const projectId = await searchProject(projectName);
    if (!projectId) {
      throw new Error(`Projet "${projectName}" non trouvé`);
    }
    console.log(`🔎 Projet trouvé : ${projectName} (ID=${projectId})`);

    // Variables à synchroniser
    const vars = [
      { key: 'NEXTAUTH_SECRET', value: env.NEXTAUTH_SECRET || 'change-me-secret' },
      { key: 'NEXTAUTH_URL', value: env.NEXTAUTH_URL || 'https://trottinette-freestyle.vercel.app' },
      { key: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY', value: env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '' },
      { key: 'TURNSTILE_SECRET_KEY', value: env.TURNSTILE_SECRET_KEY || '' }
    ];

    for (const v of vars) {
      await upsertEnv(projectId, v.key, v.value);
    }

    console.log('\n🚀 Toutes les variables sont à jour. N’oublie pas de redeployer le projet !');
  } catch (err) {
    console.error('❌ Erreur :', err.message);
    process.exit(1);
  }
})();
