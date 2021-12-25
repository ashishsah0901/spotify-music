import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  const token = await getToken({
    req,
    secret: process.env.JWT_TOKEN,
    raw: true,
  });
  const { pathname } = req.nextUrl;
  if (token && pathname === "/login") {
    return NextResponse.redirect("/");
  }
  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
};
