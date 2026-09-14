import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { makeTestUser } from "@/app/services/testing"

export const POST = async (request: Request) => {
    const { username, name, password } = await request.json()

    if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "This endpoint is not available in production" },
            { status: 403 },
        )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const userCreated = await makeTestUser(username, name, passwordHash)

    if (!userCreated) {
        return NextResponse.json(
            { error: "Failed to create test user" },
            { status: 500 },
        )
    }

    return NextResponse.json({ message: "Created" })
}