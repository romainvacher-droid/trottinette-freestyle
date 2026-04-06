import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname
  const pathname = request.nextUrl.pathname;

  // Public routes: login, signup, static assets
  if (
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/auth") ||
    pathname.includes(".") // files with extension (images, css, etc)
  ) {
    return NextResponse.next();
  }

  // Check if session exists via token cookie
  const sessionCookie = request.cookies.get("next-auth.session-token") || request.cookies.get("__Secure-next-auth.session-token");

  if (!sessionCookie) {
    // Not authenticated, redirect to login with returnUrl
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
