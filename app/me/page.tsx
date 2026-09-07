"use client"

import { useSession } from "next-auth/react"
import { generateToken } from "../actions/users"
import { getReadingList, toggleReadStatus } from "../actions/readinglist"
import { useEffect, useState } from "react"

const Me = () => {
    const { data: session, update } = useSession()
    const [readingList, setReadingList] = useState<Awaited<ReturnType<typeof getReadingList>>>([])

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
                    <div className="pb-6">
                        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                        <p><b>Name:</b> {session ? session.user?.name : "Not logged in"}</p>
                        <p><b>Username:</b> {session ? session.user?.email : "Not logged in"}</p>
                    </div>
                    <div className="pb-6">
                        <h3 className="text-xl font-bold mt-6 mb-4">Reading List</h3>
                        <h4 className="text-md font-bold mb-2">Unread</h4>
                        {readingList.length === 0 ? (
                            <p>No blogs in your reading list.</p>
                        ) : (
                            readingList.map((blog) => (
                                (!blog.read) && (
                                    <div key={blog.id} className="flex items-center justify-between bg-yellow-50 rounded-xl p-4 mb-2">
                                        <p className="mr-4">{blog.blog.title}</p>
                                        <button
                                            onClick={() => handleToggleReadStatus(blog.blog.id)}
                                            className="cursor-pointer border border-solid border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-2 py-0 rounded-xl text-sm ml-auto"
                                        >
                                            mark as read
                                        </button>
                                    </div>
                                )
                            ))
                        )}
                        <h4 className="text-md font-bold mb-2 mt-4">Read</h4>
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
                        <h3 className="text-xl font-bold mt-6 mb-4">API Token</h3>
                        <div className="bg-mauve-50 rounded-xl p-4">
                            <p>Current token:</p>
                            <div className="bg-mauve-100 rounded-xl p-2 pl-3 mb-2 mt-2">
                                <span className="font-mono">
                                    {session.user?.apiToken ? session.user.apiToken : "No token has been generated yet"}
                                </span>
                            </div>
                            <button
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