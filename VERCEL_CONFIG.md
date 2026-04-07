# Configuration Vercel

Après le premier déploiement, configure les variables d’environnement dans les **Settings > Environment Variables** du projet Vercel.

| Variable | Description | Où la trouver |
|---|---|---|
| `DATABASE_URL` | Connection string PostgreSQL (ex. Neon) | Console Neon / ton hébergeur DB |
| `NEXTAUTH_SECRET` | Clé secrète pour signer les JWT (min 32 caractères aléatoires) | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL de production du site | `https://trottinette-freestyle.vercel.app` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Clé publique Turnstile (Cloudflare) | Dashboard Cloudflare > Turnstile |
| `TURNSTILE_SECRET_KEY` | Clé secrète Turnstile | Dashboard Cloudflare > Turnstile |

### Déployer les migrations Prisma

Une fois les variables configurées, exécute (depuis ton terminal local ou via Vercel Cron / Shell) :

```bash
npx prisma migrate deploy
```

Cela créera les tables `User`, `Account`, `Session`, `VerificationToken`.

### Vérifications post‑déploiement

- [ ] Landing page accessible sans connexion
- [ ] Inscription fonctionne (Turnstile s’affiche)
- [ ] Connexion fonctionne (redirect vers `/dashboard`)
- [ ] Mot de passe oublié → email de reset (logs serveur en dev)
- [ ] `/dashboard` et `/profile` bien protégés
- [ ] Robots.txt bloque les pages sensibles
- [ ] Mentions légales et politique accessibles
- [ ] Headers sécurité présents (CSP, X‑Frame‑Options, etc.)

### Dépannage

- **Erreur 500 sur /api/auth/signup** : vérifie que `TURNSTILE_SECRET_KEY` est définie.
- **Redirect loop** : vérifie `NEXTAUTH_URL` correspond à l’URL de production.
- **Database connection error** : vérifie `DATABASE_URL` et que l’IP de Vercel est autorisée (Neon : allow all ou IP ranges Vercel).
