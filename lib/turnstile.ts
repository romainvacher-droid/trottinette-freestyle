export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('TURNSTILE_SECRET_KEY manquant en production');
    }
    // En développement : accepter sans vérification
    return true;
  }

  // Token 'disabled' accepté uniquement hors production
  if (token === 'disabled') {
    if (process.env.NODE_ENV === 'production') return false;
    return true;
  }

  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: params,
  });

  const data = await res.json();
  return data.success === true && (data.score === undefined || data.score >= 0.5);
}
