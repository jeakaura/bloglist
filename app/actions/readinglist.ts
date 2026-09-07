"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import {
  addBlogToReadingList,
  getReadingList as getReadingListFromService,
} from "../services/readinglist"

export const getReadingList = getReadingListFromService

export const addToReadingList = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"))
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  if (!Number.isInteger(blogId)) {
    return
  }

  const userId = session.user.id

  await addBlogToReadingList(userId, blogId)
  
  revalidatePath(`/blogs/${blogId}`)
  revalidatePath("/me")
  redirect("/me")
}