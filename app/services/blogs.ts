const blogs = [
  { id: 1, title: "Title 1", author: "Matti Meikalainen", url: "#", likes: 5 },
  { id: 2, title: "Title 2", author: "Maija Meikalainen", url: "#", likes: 10 },
  { id: 3, title: "Title 3", author: "Aku Ankka", url: "#", likes: 15 },
]

let nextId = 4

export const getBlogs = () => {
  return blogs
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 })
}
