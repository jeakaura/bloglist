import Link from "next/link"
import { notFound } from "next/navigation"
import { getUsernameWithBlogs } from "../../services/users"

const UserPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params
  const user = await getUsernameWithBlogs(username)

  if (!user) {
    notFound()
  }

  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
      <h2 className="text-2xl font-bold mb-4">{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link className="text-blue-600 hover:underline" href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserPage