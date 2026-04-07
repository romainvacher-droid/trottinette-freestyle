# Trottinette Freestyle

Plateforme communautaire dédiée au freestyle en trottinette. Apprends les tricks, trouve des spots, et échange avec la communauté.

---

## 🚀 Fonctionnalités

- **Authentification** : inscription, connexion, déconnexion, mot de passe oublié, réinitialisation.
- **Pages publiques** : landing page complète (hero, fonctionnalités, témoignages), mentions légales, politique de confidentialité.
- **Pages protégées** : dashboard, profil.
- **Sécurité** : rate limiting, captcha Turnstile, validation côté serveur, headers CSP, open‑redirect protection.
- **SEO** : métadonnées par page, sitemap dynamique, robots.txt, noindex sur les pages auth.
- **Responsive** : design adapté mobile/desktop (Tailwind CSS).
- **Animations** : Framer Motion pour la landing.

---

## 🛠️ Stack technique

- **Framework** : Next.js 14 (App Router) + TypeScript
- **Styling** : Tailwind CSS + styles custom
- **Auth** : NextAuth (credentials provider) + JWT + bcrypt
- **Base de données** : PostgreSQL via Prisma
- **Captcha** : Cloudflare Turnstile
- **Animations** : Framer Motion
- **Déploiement** : Vercel

---

## 📦 Installation locale

```bash
# Cloner le projet (si sur Git) ou copier le dossier
cd trottinette-freestyle

# Installer les dépendances
npm install

# Copier le fichier d’exemple d’environnement
cp .env.local.example .env.local
```

Édite `.env.local` avec tes valeurs :

```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
NEXTAUTH_SECRET="une-chaîne-aléatoire-longue"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_TURNSTILE_SITE_KEY="ta_clé_publique"
TURNSTILE_SECRET_KEY="ta_clé_secrète"
```

---

## 🗄️ Base de données

Génère le client Prisma et applique le schéma :

```bash
npx prisma generate
npx prisma db push   # ou npx prisma migrate dev --name init
```

Le schéma inclut les tables : User, Account, Session, VerificationToken.

---

## 🏃‍♂️ Lancer en développement

```bash
npm run dev
```

Ouvre http://localhost:3000

---

## 🏗️ Build et déploiement Vercel

### Build local (vérification)
```bash
npm run build
```

### Déploiement Vercel
```bash
vercel --prod --yes
```

**Variables d’environnement Vercel** : configure dans les settings du projet :
- `DATABASE_URL` (ex. : Neon PostgreSQL)
- `NEXTAUTH_SECRET` (génère avec `openssl rand -base64 32`)
- `NEXTAUTH_URL` : `https://trottinette-freestyle.vercel.app`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`

---

## 🔐 Sécurité & RGPD

### Sécurité
- Rate limiting : 10 requêtes/15 min sur login/signup, délai progressif après échecs.
- Captcha Turnstile sur les formulaires publics.
- Validation côté serveur (email, mot de passe).
- Messages d’erreur génériques (pas de divulgation d’existence d’un email).
- Protection open‑redirect : `callbackUrl` validé contre same‑origin.
- Headers : CSP, X‑Frame‑Options, X‑Content‑Type‑Options, Referrer‑Policy, Permissions‑Policy.

### RGPD
- Pages mentions légales et politique de confidentialité.
- Case obligatoire sur l’inscription.
- Données utilisateur : email, nom (optionnel), mot de passe hashé.
- Droits d’accès, rectification, suppression via contact.
- Durée de conservation : tant que le compte est actif, suppression possible sur demande.

---

## 🧭 Structure du projet

```
trottinette-freestyle/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/route.ts
│   │       ├── login/route.ts
│   │       ├── signup/route.ts
│   │       ├── forgot-password/route.ts
│   │       └── reset-password/route.ts
│   ├── dashboard/page.tsx
│   ├── profile/page.tsx
│   ├── login/
│   │   ├── page.tsx (server wrapper)
│   │   └── LoginClient.tsx
│   ├── signup/
│   │   ├── page.tsx
│   │   └── SignupClient.tsx
│   ├── forgot-password/
│   │   ├── page.tsx
│   │   └── ForgotPasswordClient.tsx
│   ├── reset-password/
│   │   ├── page.tsx
│   │   └── ResetPasswordClient.tsx
│   ├── mentions-legales/page.tsx
│   ├── politique-confidentialite/page.tsx
│   ├── not-found/page.tsx
│   ├── layout.tsx
│   ├── page.tsx (server wrapper)
│   ├── HomeClient.tsx
│   ├── globals.css
│   └── sitemap.ts
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Turnstile.tsx
├── lib/
│   ├── auth.ts
│   ├── prisma.ts
│   ├── rateLimit.ts
│   └── turnstile.ts
├── prisma/
│   └── schema.prisma
├── public/
│   ├── favicon.ico
│   ├── og-image.jpg
│   └── robots.txt
├── .env.local.example
├── middleware.ts
├── next.config.js
├── tailwind.config.js
├── postcss.config.mjs
├── vercel.json
├── package.json
└── tsconfig.json
```

---

## 📝 Notes

- La landing page redirige les utilisateurs déjà connectés vers `/dashboard` (via un effet client).
- Les pages d’authentification utilisent une API custom (`/api/auth/login`, `/api/auth/signup`) pour intégrer le captcha et le rate limiting, puis délèguent à NextAuth via le callback credentials.
- Le `middleware.ts` protège uniquement `/dashboard/*` et `/profile/*`. Aucune redirection depuis `/` n’est effectuée.
- Le CSP autorise les domaines requis ; ajuste‑le si tu ajoutes des ressources externes.
- Pour activer le captcha, crée les clés dans le dash Cloudflare et renseigne les variables d’env.

---

## 🧩 Prochaines améliorations possibles

- Ajouter une page de compte avec modification du mot de passe.
- Email templates pour vérification, reset password (actuellement logs console en dev).
- Upload avatar (stockage S3 ou Vercel Blob).
- Carte des spots (Leaflet/Mapbox).
- Forum ou fil d’actualité.
- Multilinguisme (next‑intl).
- Tests e2e (Playwright).

---

## 📄 Licence

Projet open source – libre adaptation.

---

## 👤 Contact

 contact@trottinette-freestyle.vercel.app
