import "next-auth"
import "next-auth/jwt"
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    apiToken?: string | null
  }

  interface Session {
    user: {
      apiToken?: string | null
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    apiToken?: string | null
  }
}