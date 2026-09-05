const Home = () => {
  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
      <div>
        <h2 className="text-2xl font-bold mb-4">Bloglist App</h2>
        An example app for{" "}
        <a className="text-blue-500 hover:underline" href="https://courses.mooc.fi/org/uh-cs/courses/full-stack-open-nextjs">
          Full Stack Open Next.js
        </a>
      </div>
      <div>
        See{" "}
        <a className="text-blue-500 hover:underline" href="https://github.com/fullstack-hy2020/nextjs-notes">
          https://github.com/fullstack-hy2020/nextjs-notes
        </a>{" "}
        for the source code
      </div>
    </div>
  )
}
export default Home