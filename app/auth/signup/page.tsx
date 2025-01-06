"use client"

import AuthForm from "@/components/auth/auth-form"
import { app } from "@/utils/firebase"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import Link from "next/link"
import { FormEvent } from "react"
import { createProfileAction } from "../actions"

// Need to add state to inform user of submit status

function SignupPage() {
  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = new FormData(ev.target as HTMLFormElement)
    const { email, password1 } = {
      email: form.get("email"),
      password1: form.get("password1"),
    }
    if (!email || !password1) return
    const auth = getAuth(app)
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email as string,
        password1 as string
      )
      createProfileAction(user.uid, form)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <main className="mt-3">
      <h3 className="text-4xl text-center">Sign up</h3>
      <form
        className="mx-auto w-[70vw] mt-6 [&>*]:mt-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="first-name">First name :</label>
          <input
            className="p-2 border rounded-md mt-2"
            type="text"
            id="first-name"
            placeholder="First name"
            name="firstName"
            required
          />
        </div>
        <div>
          <label htmlFor="last-name">Last name :</label>
          <input
            className="p-2 border rounded-md mt-2"
            type="text"
            id="last-name"
            placeholder="Last name"
            name="lastName"
            required
          />
        </div>
        <AuthForm />
        <div>
          <label htmlFor="password2">Verify Password :</label>
          <input
            className="p-2 border rounded-md mt-2"
            type="password"
            id="password2"
            placeholder="Verify Password"
            name="password2"
          />
        </div>
        <small className="block">
          Already have an account?{" "}
          <Link href={"/auth/signin"}>Sign in here</Link>
        </small>

        <button
          className="bg-gray-400 py-2 px-3 rounded-md text-white"
          type="submit"
        >
          Sign up
        </button>
      </form>
    </main>
  )
}

export default SignupPage
