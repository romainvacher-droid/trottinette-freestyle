import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import bcrypt from 'bcryptjs';
import { checkRateLimit } from '../../../../lib/rateLimit';
import { verifyTurnstile } from '../../../../lib/turnstile';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (!checkRateLimit(`signup:${ip}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Trop de requêtes. Réessayez plus tard.' }, { status: 429 });
  }

  try {
    const { email, password, name, turnstileToken } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    if (!turnstileToken) {
      return NextResponse.json({ error: 'Captcha requis' }, { status: 400 });
    }

    const turnstileValid = await verifyTurnstile(turnstileToken);
    if (!turnstileValid) {
      return NextResponse.json({ error: 'Captcha invalide' }, { status: 400 });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 });
    }

    // Password rules: min 8, 1 uppercase, 1 digit
    if (password.length < 8) {
      return NextResponse.json({ error: 'Mot de passe trop court (min 8 caractères)' }, { status: 400 });
    }
    if (!/[A-Z]/.test(password)) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir une majuscule' }, { status: 400 });
    }
    if (!/[0-9]/.test(password)) {
      return NextResponse.json({ error: 'Le mot de passe doit contenir un chiffre' }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: 'Un compte existe déjà avec cet email' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name: name ?? null,
        passwordHash,
      }
    });

    return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
