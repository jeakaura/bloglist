"use client"

import Homepage from "./homepage.mdx"

const Home = () => {
  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
      <div className="markdown">
        <Homepage />
      </div>
    </div>
  )
}

export default Home