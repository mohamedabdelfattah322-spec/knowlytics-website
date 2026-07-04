import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Let /ar and /ar/* pass through to [locale]/page.tsx directly
  // without redirecting back to / — this breaks the redirect loop
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/([\\w-]+)?/users/(.+)",
  ],
};
