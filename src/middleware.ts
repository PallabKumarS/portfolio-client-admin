import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./lib/verifyToken";

const authRoutes = ["/login"];

const authorizedEmail = [
  "pallabkumar26@gmail.com",
  "pallabkumar2699@gmail.com",
];

export const middleware = async (request: NextRequest) => {
  const userInfo = await getCurrentUser();

  console.log(userInfo);

  const { pathname } = request.nextUrl;

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, request.url)
      );
    }
  }

  if (userInfo?.email && !authorizedEmail.includes(userInfo?.email)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/", "/blog-management", "/messages", "/project-management"],
};
