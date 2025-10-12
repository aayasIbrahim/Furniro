import { withAuth } from "next-auth/middleware";


export default withAuth({
  // Unauthorized users are redirected here
  pages: {
    signIn: "/", // since login is a drawer on home
  },
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl;

      // Not logged in → redirect to "/"
      if (!token) return false;

      // Admin routes restriction
      if (pathname.startsWith("/admin")) {
        return token.role === "admin" 
      }

      // Allow all other routes
      return true;
    },
  },
});

export const config = {
  // Apply middleware only to admin routes
  matcher: ["/admin/:path*"],
};
