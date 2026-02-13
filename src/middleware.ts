import { auth } from "@/lib/auth";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  const isLoggedIn = !!req.auth;

  if (path.startsWith("/api/auth")) return;

  if (path.startsWith("/admin/login")) {
    if (isLoggedIn) {
      return Response.redirect(new URL("/admin", req.nextUrl));
    }
    return;
  }

  if (path.startsWith("/admin") && !isLoggedIn) {
    return Response.redirect(new URL("/admin/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
