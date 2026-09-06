import { NextResponse } from "next/server"
import { getUserWithBlogsByApiToken } from "../../services/users"

export const GET = async (request: Request) => {
  const authorization = request.headers.get("authorization")
  const token = authorization?.match(/^Bearer\s+(\S+)$/i)?.[1]

  if (!token) {
    return NextResponse.json({ error: "Token not valid" }, { status: 401 })
  }

  const me = await getUserWithBlogsByApiToken(token)

  if (!me) {
    return NextResponse.json({ error: "Token not valid" }, { status: 401 })
  }

  const result = {
    id: me?.id,
    username: me?.username,
    name: me?.name,
    createdBlogs: me?.blogs,
  }
  return NextResponse.json(result)
}