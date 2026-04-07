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
  console.log(`[login] attempt from ${ip}`);

  const delay = await getFailureDelay(ip);
  if (delay > 0) {
    await new Promise(resolve => setTimeout(resolve, delay));
  }

  if (!(await checkRateLimit(`login:${ip}`, 10, 15 * 60 * 1000))) {
    console.warn(`[login] rate limit exceeded for ${ip}`);
    return NextResponse.json({ error: 'Trop de tentatives. Réessayez plus tard.' }, { status: 429 });
  }

  try {
    const { email, password, callbackUrl, turnstileToken } = await request.json();

    if (!email || !password) {
      console.warn(`[login] missing credentials from ${ip}`);
      return NextResponse.json({ error: 'Email et mot de passe requis' }, { status: 400 });
    }

    if (!turnstileToken) {
      console.warn(`[login] missing turnstile from ${ip}`);
      return NextResponse.json({ error: 'Captcha requis' }, { status: 400 });
    }

    if (turnstileToken !== 'disabled') {
      const turnstileValid = await verifyTurnstile(turnstileToken);
      if (!turnstileValid) {
        console.warn(`[login] invalid turnstile from ${ip}`);
        return NextResponse.json({ error: 'Captcha invalide' }, { status: 400 });
      }
    }

    let safeCallbackUrl = '/dashboard';
    if (callbackUrl) {
      const baseOrigin = request.nextUrl.origin;
      if (isSafeRedirect(callbackUrl, baseOrigin)) {
        safeCallbackUrl = new URL(callbackUrl, baseOrigin).pathname + new URL(callbackUrl, baseOrigin).search;
      }
    }

    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    if (safeCallbackUrl !== '/dashboard') {
      formData.append('callbackUrl', safeCallbackUrl);
    }

    const baseUrl = request.nextUrl.origin;
    const response = await fetch(`${baseUrl}/api/auth/callback/credentials`, {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      redirect: 'manual',
    });

    console.log(`[login] NextAuth response status: ${response.status}`);

    if (response.status === 302 || response.status === 301) {
      await clearFailures(ip);
      const location = response.headers.get('Location');
      console.log(`[login] success, redirect to ${location}`);
      return NextResponse.json({ success: true, redirectTo: location ?? '/dashboard' });
    }

    if (response.status === 401) {
      await recordFailure(ip);
    }

    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      console.warn(`[login] NextAuth error:`, data);
      return NextResponse.json({ error: 'Email ou mot de passe incorrect' }, { status: response.status });
    }

    const text = await response.text();
    console.warn(`[login] NextAuth text error:`, text);
    return NextResponse.json({ error: text || 'Erreur inconnue' }, { status: response.status });
  } catch (err: any) {
    console.error('[login] exception:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
