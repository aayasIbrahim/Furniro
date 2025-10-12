import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // unauthorized হলে এখানে redirect করবে
  },
  callbacks: {
    authorized: ({ token, req }) => {
      if (!token) return false;

      const { pathname } = req.nextUrl;

      // /admin → শুধু admin + super-admin allowed
      if (pathname.startsWith("/admin")) {
        return token.role === "admin" || token.role === "super-admin";
      }
      return true; // 
    },
  },
});

export const config = {
  matcher: [
    "/admin/:path*",
  ], // এই path গুলোর জন্য middleware apply হবে
};