import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { checkRateLimit } from '../../../../lib/rateLimit';
import { sendPasswordResetEmail } from '../../../../lib/email';
import { randomBytes } from 'crypto';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (!(await checkRateLimit(`forgot:${ip}`, 5, 60 * 60 * 1000))) {
    return NextResponse.json({ error: 'Trop de requêtes. Réessayez plus tard.' }, { status: 429 });
  }

  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    // Always respond success to not leak account existence
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      const token = randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 3600000); // 1 hour

      await prisma.verificationToken.deleteMany({ where: { identifier: email } });
      await prisma.verificationToken.create({ data: { identifier: email, token, expires } });

      await sendPasswordResetEmail(email, token);
    }

    return NextResponse.json({
      ok: true,
      message: 'Si votre email existe, un lien de réinitialisation a été envoyé.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
