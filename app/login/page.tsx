"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    })

    if (result?.error) {
      setError("Invalid username or password")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username{" "}
            <input className="border border-black rounded mb-2" type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Password{" "}
            <input className="border border-black rounded mb-4" type="password" name="password" required />
          </label>
        </div>
        <button 
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm text-white"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  )
}