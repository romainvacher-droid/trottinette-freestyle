export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '../../../lib/rateLimit';
import { Resend } from 'resend';

const ADMIN_EMAIL = process.env.EMAIL_FROM ?? 'contact@trottinette-freestyle.vercel.app';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';
  if (!(await checkRateLimit(`contact:${ip}`, 5, 60 * 60 * 1000))) {
    return NextResponse.json({ error: 'Trop de messages. Réessayez plus tard.' }, { status: 429 });
  }

  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Nom, email et message requis.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 });
    }

    if (message.length > 2000) {
      return NextResponse.json({ error: 'Message trop long (2000 caractères max).' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subject || 'Nouveau message'} – ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 8px;">
          <h2 style="color: #facc15; margin-bottom: 16px;">Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> <a href="mailto:${email}" style="color: #facc15;">${email}</a></p>
          ${subject ? `<p><strong>Sujet :</strong> ${subject}</p>` : ''}
          <hr style="border-color: #374151; margin: 16px 0;" />
          <p style="white-space: pre-wrap; color: #d1d5db;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
