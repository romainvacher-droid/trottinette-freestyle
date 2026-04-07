#!/usr/bin/env bash
set -e

echo "=== Build du projet Trottinette Freestyle ==="
npm run build

echo "=== Déploiement sur Vercel (production) ==="
vercel --prod --yes

echo "=== Déploiement terminé ==="
echo "N'oublie pas de configurer les variables d'environnement sur Vercel :"
echo "- DATABASE_URL"
echo "- NEXTAUTH_SECRET"
echo "- NEXTAUTH_URL (https://trottinette-freestyle.vercel.app)"
echo "- NEXT_PUBLIC_TURNSTILE_SITE_KEY"
echo "- TURNSTILE_SECRET_KEY"
echo ""
echo "Puis exécute 'npx prisma migrate deploy' pour appliquer les migrations."
