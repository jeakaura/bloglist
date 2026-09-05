"use client"

import { useSession } from "next-auth/react"
import { generateToken } from "../actions/users"

const Me = () => {
    const { data: session, update } = useSession()

    const handleGenerateToken = async () => {
        const username = session?.user?.email
        if (!username) return

        const newToken = await generateToken(username)
        await update({ apiToken: newToken })
    }

  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
        {
            session ? (
                <div>
                    <div>
                        <h2 className="text-2xl font-bold mb-4">My Profile</h2>
                        <p><b>Name:</b> {session ? session.user?.name : "Not logged in"}</p>
                        <p><b>Username:</b> {session ? session.user?.email : "Not logged in"}</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mt-6 mb-2">API Token</h3>
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