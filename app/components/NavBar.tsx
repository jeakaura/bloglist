"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"

const NavBar = () => {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 border-solid border-b border-stone-700 bg-background text-white px-6 py-4 flex items-center gap-4">
      <Link href="/" className="text-stone-700 hover:underline">
        home
      </Link>
      <Link href="/blogs" className="text-stone-700 hover:underline">
        blogs
      </Link>
      <Link href="/users" className="text-stone-700 hover:underline">
        users
      </Link>
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <Link href="/blogs/new" className="text-stone-700 hover:underline">
              Create new
            </Link>
            <Link href="/me" className="text-stone-700 hover:underline">
              me
            </Link>
            <button
              test-id="logout"
              onClick={() => signOut()}
              className="cursor-pointer border border-solid border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-2 py-0 rounded-xl text-sm"
            >
              logout
            </button>
          </>
        ) : (
          <>
            <Link test-id="login" title="login" href="/login" className="cursor-pointer rounded-xl border border-blue-600 py-0 px-2 text-center text-sm text-blue-600 transition-all hover:bg-blue-600 hover:text-white">
              login
            </Link>
            <Link test-id="register" href="/register" className="cursor-pointer rounded-xl bg-blue-600 py-0 px-3 text-center text-sm text-white transition-all hover:bg-blue-700 hover:text-white">
              register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar