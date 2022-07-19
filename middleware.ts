import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      console.log('req', req);
      console.log('token', token);
      // /admin requires admin role, but /me only requires the user to be logged in.
      return req.nextUrl.pathname !== "/admin" || token?.userRole === "admin";
    },
  },
})

export const config = { matcher: ["/admin", "/me"] }
