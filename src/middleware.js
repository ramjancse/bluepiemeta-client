export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/dashboard", "/artists/:path*", "/albums/:path*"],
};
