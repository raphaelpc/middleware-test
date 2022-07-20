import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      console.log('token!', token);
      console.log('token?.userRole!', token?.userRole);
  
      const secret = process.env.NEXTAUTH_SECRET;
      console.log('secret!', secret);

      const { cookies } = req;
      console.log('cookies!', cookies);
      console.log('cookies instanceof Map!', cookies instanceof Map);
      console.log('cookies.keys()!', cookies.keys());

      const cookieSessionToken = cookies.get('__Secure-next-auth.session-token');
      console.log('cookie "__Secure-next-auth.session-token"!', cookieSessionToken);

      const cookieCallbackUrl = cookies.get('__Secure-next-auth.callback-url');
      console.log('cookie "__Secure-next-auth.callback-url"!', cookieCallbackUrl);

      const cookieCsrfToken = cookies.get('__Host-next-auth.csrf-token');
      console.log('cookie "__Host-next-auth.csrf-token"!', cookieCsrfToken);
      
      const allCookies = cookies.entries();
      console.log('allCookies!', allCookies);

      // /admin requires admin role, but /me only requires the user to be logged in.
      return req.nextUrl.pathname !== "/admin" || token?.userRole === "admin";
    },
  },
})

export const config = { matcher: ["/admin", "/me"] }
