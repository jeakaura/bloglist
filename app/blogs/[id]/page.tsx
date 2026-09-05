import { notFound } from "next/navigation"
import { likeBlog } from "../../actions/blogs"
import { getBlogById } from "../../services/blogs"

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const blog = await getBlogById(Number(id))

  if (!blog) {
    notFound()
  }

  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
      <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>Url: <a className="text-blue-600 hover:underline" href={blog.url}>{blog.url}</a></p>
      <p>Likes: {blog.likes}</p>
      <form action={likeBlog}>
        <input type="hidden" name="id" value={blog.id} />
        <button className="cursor-pointer rounded-xl border border-blue-600 py-0 px-2 text-center text-sm text-blue-600 transition-all hover:bg-blue-600 hover:text-white" type="submit">Like</button>
      </form>
    </div>
  )
}

export default BlogPage