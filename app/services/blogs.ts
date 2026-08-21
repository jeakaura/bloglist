import { eq, desc } from "drizzle-orm"
import { db } from "../../db"
import { blogs } from "../../db/schema"

export const getBlogs = () => {
  return db.query.blogs.findMany({
    orderBy: [desc(blogs.likes)],
  })
}

export const addBlog = async (title: string, author: string, url: string) => {
  await db.insert(blogs).values({ title, author, url, likes: 0 })
}

export const getBlogById = async (id: number) => {
  return db.query.blogs.findFirst({
    where: eq(blogs.id, id),
  })
}

export const incrementBlogLikes = async (id: number) => {
  const blog = await getBlogById(id)

  if (blog) {
    await db.update(blogs).set({ likes: (blog.likes ?? 0) + 1 }).where(eq(blogs.id, id))
  }
}

/*
export const incrementBlogLikes = (id: number) => {
  const blog = blogs.find(blog => blog.id === id)

  if (blog) {
    blog.likes += 1
  }
}
*/
