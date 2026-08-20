import { getBlogs } from "../services/blogs"

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) => {
  const { filter } = await searchParams
  const blogs = getBlogs()
  return (
    <div>
      <h2>Blogs</h2>
      
      <form>
        <input type="text" name="filter" placeholder="Filter blogs..." />
        <button type="submit">Filter</button>
      </form>

      {
        filter ? (
          <ul>
            {
              blogs.filter(blog => blog.title.toLowerCase().includes(filter.toLowerCase())).map(blog => (
                <li key={blog.id}>
                  <h3><a href={`/blogs/${blog.id}`}>{blog.title}</a></h3>
                  <p>Author: {blog.author}</p>
                  <p>Url: <a href={blog.url}>{blog.url}</a></p>
                  <p>Likes: {blog.likes}</p>
                </li>
              ))
            }
          </ul>
        ) : (
          <ul>
            {blogs.map(blog => (
              <li key={blog.id}>
                <h3><a href={`/blogs/${blog.id}`}>{blog.title}</a></h3>
                <p>Author: {blog.author}</p>
                <p>Url: <a href={blog.url}>{blog.url}</a></p>
                <p>Likes: {blog.likes}</p>
              </li>
            ))}
          </ul>
        )
      }

    </div>
  )
}
export default Blogs