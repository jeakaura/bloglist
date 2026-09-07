import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { eq } from "drizzle-orm"
import bcrypt from "bcryptjs"
import { db } from "./db"
import { users } from "./db/schema"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const username = credentials?.username
        const password = credentials?.password

        if (typeof username !== "string" || typeof password !== "string") {
          return null
        }

        const user = await db.query.users.findFirst({
          where: eq(users.username, username),
        })

        if (!user || typeof user.passwordHash !== "string") {
          return null
        }

        const isValid = await bcrypt.compare(password, user.passwordHash)

        if (!isValid) {
          return null
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.username,
          apiToken: user.apiToken,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id
        token.apiToken = user.apiToken
      }

      if (trigger === "update" && session?.apiToken !== undefined) {
        token.apiToken = session.apiToken
      }

      return token
    },
    async session({ session, token }) {
      if (session.user && typeof token.id === "string") {
        session.user.id = token.id
        session.user.apiToken = token.apiToken
      }

      return session
    },
  },
})