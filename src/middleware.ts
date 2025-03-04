import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get("token");
  const token = jwtToken?.value;

  if (!token) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/reset-password"
    ) {
      return NextResponse.next();
    }

    if (request.nextUrl.pathname.startsWith("/api/user/profile/")) {
      return NextResponse.json(
        { message: "No token provided, access denied" },
        { status: 401 }
      );
    } else if (
      request.nextUrl.pathname === "/wishlist" ||
      request.nextUrl.pathname === "/profile" ||
      request.nextUrl.pathname === "/profile/user" ||
      request.nextUrl.pathname === "/profile/admin"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/reset-password"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/users/profile/:path*",
    "/login",
    "/reset-password",
    "/register",
    "/wishlist",
    "/profile/user",
    "/profile/admin",
  ],
};
