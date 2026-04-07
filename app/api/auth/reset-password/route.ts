import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const { token, email, newPassword } = await request.json();
    if (!token || !email || !newPassword) {
      return NextResponse.json({ error: 'Token, email et mot de passe requis' }, { status: 400 });
    }

    const verification = await prisma.verificationToken.findFirst({
      where: { identifier: email, token }
    });

    if (!verification || verification.expires < new Date()) {
      return NextResponse.json({ error: 'Token invalide ou expiré' }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { email },
      data: { passwordHash }
    });

    await prisma.verificationToken.deleteMany({
      where: { identifier: email }
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
