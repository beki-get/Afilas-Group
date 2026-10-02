import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin routes are NOT localized.
  // Keep /admin/... separate from next-intl routes.
  if (pathname.startsWith("/admin")) {
    // Admin login is public.
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // All other admin pages require the admin cookie.
    if (!request.cookies.has("admin_token")) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    return NextResponse.next();
  }

  // Only localized/public routes go through next-intl.
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|am)/:path*",
    "/admin/:path*",
  ],
};