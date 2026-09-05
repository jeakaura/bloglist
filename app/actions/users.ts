"use server"

import { redirect } from "next/navigation"
import bcrypt from "bcryptjs"
import { db } from "../../db"
import { users } from "../../db/schema"
import { revalidatePath } from "next/cache"
import { updateUserApiToken } from "../services/users"

export type UserFormState = {
  errors: { username?: string; name?: string; password?: string, passwordConfirm?: string }
  values?: { username: string; name: string; password: string; passwordConfirm: string }
}

export const registerUser = async (
  prevState: UserFormState,
  formData: FormData
) => {
  const username = (formData.get("username") as string)?.trim()
  const name = (formData.get("name") as string)?.trim()
  const password = formData.get("password") as string
  const passwordConfirm = formData.get("passwordConfirm") as string

  const errors: UserFormState["errors"] = {}

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long"
  }
  if (!name || name.length < 4) {
    errors.name = "Name must be at least 4 characters long"
  }
  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long"
  }
  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match"
  }
  

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name, password, passwordConfirm } }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  try {
    await db.insert(users).values({ username, name, passwordHash })
  } catch (e) {
    errors.username = "Username is already taken"
    return { errors, values: { username, name, password, passwordConfirm } }
  }

  redirect("/login")
}

export const generateToken = async (username: string) => {
  const newToken = await updateUserApiToken(username)
  revalidatePath("/me")
  return newToken
}