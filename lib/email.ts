import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM ?? 'noreply@trottinette-freestyle.vercel.app';
const SITE_URL = process.env.NEXTAUTH_URL ?? 'https://trottinette-freestyle.vercel.app';

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const resetUrl = `${SITE_URL}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Réinitialisation de votre mot de passe – Trottinette Freestyle',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #111; color: #fff; padding: 32px; border-radius: 8px;">
        <h1 style="color: #eab308; margin-bottom: 16px;">Réinitialisation du mot de passe</h1>
        <p style="color: #d1d5db; margin-bottom: 24px;">
          Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour en créer un nouveau.
        </p>
        <a href="${resetUrl}"
           style="display: inline-block; background: #eab308; color: #000; font-weight: bold; padding: 14px 28px; border-radius: 9999px; text-decoration: none; margin-bottom: 24px;">
          Réinitialiser mon mot de passe
        </a>
        <p style="color: #9ca3af; font-size: 14px;">
          Ce lien expire dans <strong>1 heure</strong>. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
        </p>
        <hr style="border-color: #374151; margin: 24px 0;" />
        <p style="color: #6b7280; font-size: 12px;">Trottinette Freestyle – La plateforme des riders urbains</p>
      </div>
    `,
  });
}
