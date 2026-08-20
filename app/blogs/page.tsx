const blogs = [
  { id: 1, title: "Title 1", author: "Matti Meikalainen", url: "#", likes: 5 },
  { id: 2, title: "Title 2", author: "Maija Meikalainen", url: "#", likes: 10 },
  { id: 3, title: "Title 3", author: "Aku Ankka", url: "#", likes: 15 },
]

const Blogs = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>Author: {blog.author}</p>
            <p>Link: <a href={blog.url}>{blog.url}</a></p>
            <p>Likes: {blog.likes}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Blogs