export async function verifyTurnstile(token: string): Promise<boolean> {
  // Token 'disabled' signifie que Turnstile n'est pas configuré, on l'accepte
  if (token === 'disabled') {
    return true;
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    // Pas de secret configuré, on accepte le token (dev)
    return true;
  }

  const params = new URLSearchParams();
  params.append('secret', secret);
  params.append('response', token);

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: params
  });

  const data = await res.json();
  return data.success === true && (data.score === undefined || data.score >= 0.5);
}
