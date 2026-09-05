"use client"

import { useActionState } from "react"
import { registerUser, UserFormState } from "../actions/users"

export default function RegisterPage() {
  const initialState: UserFormState = { errors: {} }
  const [state, formAction] = useActionState(registerUser, initialState)
  
  return (
    <div className="border-solid border-l border-r border-stone-700 max-w-3xl mx-auto min-h-[calc(100vh-57px)] p-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction}>
        <div>
          <label>
            Username{" "}
            <input className="border border-black rounded mb-2" type="text" name="username" defaultValue={state.values?.username} required />
            {state.errors.username && <p style={{ color: "red" }}>{state.errors.username}</p>}
          </label>
        </div>
        <div>
          <label>
            Name{" "}
            <input className="border border-black rounded mb-2" type="text" name="name" defaultValue={state.values?.name} required />
            {state.errors.name && <p style={{ color: "red" }}>{state.errors.name}</p>}
          </label>
        </div>
        <div>
          <label>
            Password{" "}
            <input className="border border-black rounded mb-2" type="password" name="password" defaultValue={state.values?.password} required />
            {state.errors.password && <p style={{ color: "red" }}>{state.errors.password}</p>}
          </label>
        </div>
        <div>
          <label>
            Confirm Password{" "}
            <input className="border border-black rounded mb-4" type="password" name="passwordConfirm" defaultValue={state.values?.passwordConfirm} required />
            {state.errors.passwordConfirm && <p style={{ color: "red" }}>{state.errors.passwordConfirm}</p>}
          </label>
        </div>
        <button 
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm text-white"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  )
}