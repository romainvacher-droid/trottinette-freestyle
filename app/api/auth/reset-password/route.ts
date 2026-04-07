export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { checkRateLimit } from '../../../../lib/rateLimit';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (!(await checkRateLimit(`reset:${ip}`, 10, 60 * 60 * 1000))) {
    return NextResponse.json({ error: 'Trop de requêtes. Réessayez plus tard.' }, { status: 429 });
  }

  try {
    const { token, email, newPassword } = await request.json();
    if (!token || !email || !newPassword) {
      return NextResponse.json({ error: 'Token, email et mot de passe requis' }, { status: 400 });
    }

    if (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
      return NextResponse.json(
        { error: 'Mot de passe invalide (min 8 caractères, 1 majuscule, 1 chiffre)' },
        { status: 400 }
      );
    }

    const verification = await prisma.verificationToken.findFirst({
      where: { identifier: email, token },
    });

    if (!verification || verification.expires < new Date()) {
      return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({ where: { email }, data: { passwordHash } });
    await prisma.verificationToken.deleteMany({ where: { identifier: email } });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
