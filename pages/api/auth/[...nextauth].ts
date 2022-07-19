import NextAuth, { NextAuthOptions } from "next-auth"
import DiscordProvider from 'next-auth/providers/discord'
import GithubProvider from "next-auth/providers/github"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // DiscordProvider({
    //   clientId: process.env.DISCORD_LOGIN_CLIENT_ID,
    //   clientSecret: process.env.DISCORD_LOGIN_CLIENT_SECRET,
    // }),
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions)
