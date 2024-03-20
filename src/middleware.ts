import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookie = cookies().get("authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;
  console.log({ jwt, secret });
  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    //     const { headers } = request;
    // const contentType = headers.get('content-type') || '';
    //    if (contentType.includes('application/json')) {
    //   const body = await request.json(); // Parse the request body as JSON
    //   const modifiedBody = {
    //     ...body,
    //     // Modify the request body here
    //     newField: 'value',
    //   };

    //   request.body = modifiedBody;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: " failed",
      message: "jwt verification failed",
    });
  }

  // return NextResponse.redirect(new URL("/home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/interests/:path*", "/protected/:path*"],
};
