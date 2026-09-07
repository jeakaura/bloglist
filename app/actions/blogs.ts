"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { addBlog, incrementBlogLikes } from "../services/blogs"
import { addBlogToReadingList } from "../services/readinglist"
import { auth } from "@/auth"

export const createBlog = async (
  prevState: { error: string; success?: boolean },
  formData: FormData,
) => {
  const session = await auth()
  if (!session) {
    redirect("/login")
  }
  
  const title = formData.get("title") as string
  const author = formData.get("author") as string
  const url = formData.get("url") as string

  if (!title || title.length < 5) {
    return {
      error: "Blog title must be at least 5 characters long",
      success: false,
    }
  }
  if (!author || author.length < 5) {
    return {
      error: "Blog author must be at least 5 characters long",
      success: false,
    }
  }
  if (!url || url.length < 5) {
    return {
      error: "Blog url must be at least 5 characters long",
      success: false,
    }
  }
  
  const blog = await addBlog(title, author, url)
  await addBlogToReadingList(session.user.id, blog.id)

  revalidatePath("/blogs")
  revalidatePath("/me")
  return { error: "", success: true }
}

export const likeBlog = async (formData: FormData) => {
  const id = Number(formData.get("id"))

  if (!Number.isInteger(id)) {
    return
  }

  await incrementBlogLikes(id)
  revalidatePath(`/blogs/${id}`)
  revalidatePath("/blogs")
}