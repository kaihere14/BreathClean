import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(request: NextRequest): NextResponse {
  const refreshToken = request.cookies.get("refreshToken");
  const isAuthenticated = Boolean(refreshToken);

  console.log("Middleware executed. isAuthenticated:", isAuthenticated);

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/Login")) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  }

  if (pathname.startsWith("/home")) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Login", "/home/:path*"],
};
