import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const userToken = token?.user as { type: string };

  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/signin" || path === "/signup" || path === "/";

  if (path === "/" && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }

  if (isPublicPath && token) {
    if (userToken.type === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.nextUrl));
    } else if (userToken.type === "user") {
      return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    }
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
  //   if (isPublicPath && token) {
  //     return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  //   }

  //   if (!isPublicPath && !token) {
  //     return NextResponse.redirect(new URL("/signin", request.nextUrl));
  //   }    `

  // route check for admin user



  // if (
  //   userToken?.type === "admin" &&
  //   !!request.nextUrl.pathname.startsWith("/dashboard")
  // ) {
  //   return NextResponse.rewrite(new URL("/denied", request.url));
  // } else if (
  //   userToken?.type === "user" &&
  //   !!request.nextUrl.pathname.startsWith("/admin")
  // ) {
  //   return NextResponse.rewrite(new URL("/denied", request.url));
  // }

  if (
    userToken?.type === "admin" &&
    !!request.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.rewrite(new URL("/denied", request.url));
  }else if (userToken?.type === "user" &&
  !!request.nextUrl.pathname.startsWith("/admin")){
    return NextResponse.rewrite(new URL("/denied", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard/:path*", "/admin/:path*", "/signin", "/signup"],
};
