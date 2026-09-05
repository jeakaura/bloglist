import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = await getBlogs()
  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>

      <div className="mb-5">
        <div className="w-full max-w-full min-w-[200px]">
          <div className="relative">
            <form>
              <input className="w-full bg-transparent placeholder:text-stone-500 text-sm rounded-3xl border border-stone-500 rounded pl-3 pr-16 py-2"type="text" name="filter" placeholder="filter blogs..." />
              <button className="cursor-pointer absolute right-2 top-2 rounded-xl border border-blue-600 py-0 px-2 text-center text-sm text-blue-600 transition-all hover:bg-blue-600 hover:text-white" type="submit">filter</button>
            </form>
          </div>
        </div>
      </div>
      
      {
        filter ? (
          <ul className="space-y-2">
            {
              blogs.filter(blog => blog.title.toLowerCase().includes(filter.toLowerCase())).map(blog => (
                <li key={blog.id} className="bg-mauve-50 rounded-xl p-4">
                  <h3 className="mb-2 text-lg hover:underline"><a href={`/blogs/${blog.id}`}>{blog.title}</a></h3>
                  <div className="text-sm">
                    <p>Author: {blog.author}</p>
                    <p>Url: <a className="text-blue-500 hover:underline" href={blog.url}>{blog.url}</a></p>
                    <p>Likes: {blog.likes}</p>
                  </div>
                </li>
              ))
            }
          </ul>
        ) : (
          <ul className="space-y-2">
            {blogs.map(blog => (
              <li key={blog.id} className="bg-mauve-50 rounded-xl p-4">
                <h3 className="mb-2 text-lg hover:underline"><a href={`/blogs/${blog.id}`}>{blog.title}</a></h3>
                <div className="text-sm">
                  <p>Author: {blog.author}</p>
                  <p>Url: <a className="text-blue-500 hover:underline" href={blog.url}>{blog.url}</a></p>
                  <p>Likes: {blog.likes}</p>
                </div>
              </li>
            ))}
          </ul>
        )
      }

    </div>
  )
}
export default Blogs