export async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Token 'disabled' toujours accepté (Turnstile désactivé)
  if (token === 'disabled') {
    return true;
  }

  if (!secret) {
    // Si pas de secret configuré, on ne peut pas vérifier
    console.warn('TURNSTILE_SECRET_KEY manquant – verification Turnstile impossible');
    return false;
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
