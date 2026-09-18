"use client"

import { useSession } from "next-auth/react"
import { generateToken } from "../actions/users"
import { getReadingList, toggleReadStatus } from "../actions/readinglist"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const Me = () => {
    const { data: session, status, update } = useSession()
    const router = useRouter()
    const [readingList, setReadingList] = useState<Awaited<ReturnType<typeof getReadingList>>>([])

    useEffect(() => {
        if (status === "unauthenticated") {
            router.replace("/login")
        }
    }, [router, status])

    useEffect(() => {
        if (!session?.user?.id) return

        const loadReadingList = async () => {
            const blogs = await getReadingList()
            setReadingList(blogs ?? [])
        }

        loadReadingList()
    }, [session?.user?.id])

    const handleGenerateToken = async () => {
        const username = session?.user?.email
        if (!username) return

        const newToken = await generateToken(username)
        await update({ apiToken: newToken })
    }

    const handleToggleReadStatus = async (blogId: number) => {
        await toggleReadStatus(blogId)

        setReadingList((currentList) =>
            currentList.map((entry) =>
                entry.blog.id === blogId
                    ? { ...entry, read: !entry.read }
                    : entry
            )
        )
    }

  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
        {
            session ? (
                <div className="divide-y divide-solid divide-stone-400">
                    <div data-testid="user-profile" className="pb-6">
                        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                        <p data-testid="user-name"><b>Name:</b> {session ? session.user?.name : "Not logged in"}</p>
                        <p data-testid="user-username"><b>Username:</b> {session ? session.user?.email : "Not logged in"}</p>
                    </div>
                    <div className="pb-6">
                        <h3 data-testid="reading-list-section" className="text-xl font-bold mt-6 mb-4">Reading List</h3>
                        <h4 className="text-md font-bold mb-2">Unread</h4>
                        <div data-testid="unread-section">
                        {readingList.some((blog) => !blog.read) ? (
                            readingList.map((blog) => (
                                (!blog.read) && (
                                    <span key={blog.id} className="flex items-center justify-between bg-yellow-50 rounded-xl p-4 mb-2">
                                        <p className="mr-4">{blog.blog.title}</p>
                                        <button
                                            data-testid="mark-read-"
                                            onClick={() => handleToggleReadStatus(blog.blog.id)}
                                            className="cursor-pointer border border-solid border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-2 py-0 rounded-xl text-sm ml-auto"
                                        >
                                            mark as read
                                        </button>
                                    </span>
                                )
                            ))
                        ) : (
                            <p data-testid={readingList.length === 0 ? "empty-reading-list" : "no-unread-blogs"}>
                                {readingList.length === 0 ? "No blogs in your reading list." : "No unread blogs."}
                            </p>
                        )}
                        </div>
                        <h4 data-testid="read-section" className="text-md font-bold mb-2 mt-4">Read</h4>
                        {readingList.length === 0 ? (
                            <p>No blogs in your reading list.</p>
                        ) : (
                            readingList.map((blog) => (
                                (blog.read) && (
                                    <div key={blog.id} className="flex items-center justify-between bg-green-50 rounded-xl p-4 mb-2">
                                        <p className="mr-4">{blog.blog.title}</p>
                                        <button
                                            onClick={() => handleToggleReadStatus(blog.blog.id)}
                                            className="cursor-pointer border border-solid border-stone-600 text-stone-600 hover:bg-stone-600 hover:text-white px-2 py-0 rounded-xl text-sm ml-auto"
                                        >
                                            mark as unread
                                        </button>
                                    </div>
                                )
                            ))
                        )}
                    </div>
                    <div>
                        <h3 data-testid="api-token-section" className="text-xl font-bold mt-6 mb-4">API Token</h3>
                        <div className="bg-mauve-50 rounded-xl p-4">
                            <p>Current token:</p>
                            <div data-testid="token-display" className="bg-mauve-100 rounded-xl p-2 pl-3 mb-2 mt-2">
                                <span className="font-mono">
                                    {session.user?.apiToken ? <span data-testid="api-token">{session.user.apiToken}</span> : <span data-testid="no-token-message">No token has been generated yet</span>}
                                </span>
                            </div>
                            <button
                                data-testid="generate-token-button"
                                onClick={handleGenerateToken}
                                className="cursor-pointer mt-2 border border-solid border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-2 py-0 rounded-xl text-sm"
                            >
                                generate new token
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p>You are not logged in.</p>
                </div>
            )
        }
    </div>
  )
}
export default Me