import { and, eq } from "drizzle-orm"
import { db } from "../../db"
import { blogs, readingList } from "../../db/schema"
import { getCurrentUser } from "./session"

export const addBlogToReadingList = async (userId: string, blogId: number) => {
  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.id, blogId),
  })

  if (!blog) {
    throw new Error("Blog not found")
  }

  const userIdInt = parseInt(userId, 10)

  const existingEntry = await db.query.readingList.findFirst({
    where: and(
      eq(readingList.userId, userIdInt),
      eq(readingList.blogId, blogId),
    ),
  })

  if (existingEntry) {
    return
  }

  await db.insert(readingList).values({ userId: userIdInt, blogId })
}

export const getReadingList = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return []
  }

  return db.query.readingList.findMany({
    where: eq(readingList.userId, user.id),
    with: {
      blog: true,
    },
  })
}