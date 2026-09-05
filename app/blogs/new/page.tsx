"use client"

import { useActionState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createBlog } from "../../actions/blogs"
import { useNotification } from "../../components/NotificationContext"

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    error: "",
    success: false,
  })
  const { showNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    if (state.success) {
      showNotification("blog created")
      router.push("/blogs")
    }
  }, [state, showNotification, router])

  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
      <h2 className="text-2xl font-bold mb-4">Create a new blog</h2>
      <form action={formAction}>
        <div>
          <label>
            Title {" "}
            <input className="border border-black rounded mb-2" type="text" name="title" />
          </label>
        </div>
        <div>
          <label>
            Author {" "}
            <input className="border border-black rounded mb-2" type="text" name="author" />
          </label>
        </div>
        <div>
          <label>
            Url {" "}
            <input className="border border-black rounded mb-2" type="text" name="url" />
          </label>
        </div>
        <button 
          className="mt-4 cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm text-white"
          type="submit"
        >
          Create
        </button>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      </form>
    </div>
  )
}

export default NewBlog