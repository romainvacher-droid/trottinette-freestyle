export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getFailureDelay, recordFailure, clearFailures } from '../../../../lib/rateLimit';
import { verifyTurnstile } from '../../../../lib/turnstile';

function isSafeRedirect(url: string, baseOrigin: string): boolean {
  try {
    const parsed = new URL(url, baseOrigin);
    return parsed.origin === baseOrigin;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ?? 'unknown';

  const delay = await getFailureDelay(ip);
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  if (!(await checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000))) {
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });
  }

  try {
    const { email, password, callbackUrl, turnstileToken } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    if (!turnstileToken) {
      return NextResponse.json({ error: 'Captcha requis' }, { status: 400 });
    }

    if (turnstileToken !== 'disabled') {
      const turnstileValid = await verifyTurnstile(turnstileToken);
      if (!turnstileValid) {
        return NextResponse.json({ error: 'Captcha invalide' }, { status: 400 });
      }
    }

    let safeCallbackUrl = '/dashboard';
    if (callbackUrl) {
      const baseOrigin = request.nextUrl.origin;
      if (isSafeRedirect(callbackUrl, baseOrigin)) {
        const parsed = new URL(callbackUrl, baseOrigin);
        safeCallbackUrl = parsed.pathname + parsed.search;
      }
    }

    const baseUrl = request.nextUrl.origin;

    // Étape 1 : obtenir le CSRF token depuis NextAuth (obligatoire en v4)
    const csrfRes = await fetch(`${baseUrl}/api/auth/csrf`, {
      headers: { 'Cookie': request.headers.get('cookie') ?? '' },
    });
    const { csrfToken } = await csrfRes.json();
    const csrfSetCookie = csrfRes.headers.get('set-cookie') ?? '';
    const csrfCookiePart = csrfSetCookie.split(';')[0]; // "name=value" uniquement

    // Combiner les cookies client avec le cookie CSRF
    const clientCookies = request.headers.get('cookie') ?? '';
    const allCookies = [clientCookies, csrfCookiePart].filter(Boolean).join('; ');

    // Étape 2 : appeler le callback NextAuth avec le CSRF token
    const formData = new URLSearchParams();
    formData.append('csrfToken', csrfToken);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('callbackUrl', safeCallbackUrl);

    const response = await fetch(`${baseUrl}/api/auth/callback/credentials`, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': allCookies,
      },
      redirect: 'manual',
    });

    if (response.status === 302 || response.status === 301) {
      const location = response.headers.get('Location') ?? '';

      // Normaliser en chemin relatif (NextAuth renvoie parfois une URL absolue)
      let locationPath: string;
      try {
        const parsed = new URL(location, baseUrl);
        locationPath = parsed.pathname + parsed.search;
      } catch {
        locationPath = location;
      }

      // Si redirigé vers /login → échec d'authentification
      if (locationPath.startsWith('/login') || locationPath.includes('error=')) {
        await recordFailure(ip);
        return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
      }

      // Succès — transmettre le cookie de session au client
      await clearFailures(ip);
      const result = NextResponse.json({ success: true, redirectTo: locationPath });
      const sessionCookie = response.headers.get('set-cookie');
      if (sessionCookie) {
        result.headers.set('set-cookie', sessionCookie);
      }
      return result;
    }

    await recordFailure(ip);
    return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: 401 });
  } catch (err: any) {
    console.error('[login] exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
