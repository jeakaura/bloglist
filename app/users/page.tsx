import Link from "next/link"
import { getUsers } from "../services/users"

const Users = async () => {
  const users = await getUsers()

  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul className="list-disc list-outside space-y-1">
        {users.map((user) => (
          <li key={user.id}>
            <Link className="underline" href={`/users/${user.username}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Users