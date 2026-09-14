import { db } from "../../db"
import { blogs, readingList, users } from "../../db/schema"

export const makeTestUser = async (username: string, name: string, passwordHash: string) => {
    try {
        await db.insert(users).values({ username, name, passwordHash })
        return true
    } catch (error) {
        console.error("Error creating test user:", error)
        return false
    }
}

export const resetDatabase = async () => {
    try {
        await db.delete(readingList).execute()
        await db.delete(blogs).execute()
        await db.delete(users).execute()
        return true
    } catch (error) {
        console.error("Error resetting database:", error)
        return false
    }
}