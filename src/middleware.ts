import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
});

export const config = {
  matcher: ["/((?!login|signup|confirm|api).*)"],
};
