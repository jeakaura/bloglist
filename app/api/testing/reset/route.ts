import { resetDatabase } from "@/app/services/testing"
import { NextResponse } from "next/server"

export const DELETE = async () => {
    const res = await resetDatabase()

    if (!res) {
        return NextResponse.json({ error: "Reset failed" }, { status: 500 })
    }
    
    return NextResponse.json({ message: "Database reset successfully" })
}