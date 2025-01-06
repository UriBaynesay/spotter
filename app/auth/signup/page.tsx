"use client"

import AuthForm from "@/components/auth/auth-form"
import Link from "next/link"
import { useActionState } from "react"
import { signUpAction } from "../actions"

function SignupPage() {
  const [state, formAction, isPending] = useActionState(signUpAction, {
    error: {},
    message: null,
  })
  return (
    <main className="mt-3">
      <h3 className="text-4xl text-center">Sign up</h3>
      <form action={formAction} className="mx-auto w-[70vw] mt-6 [&>*]:mt-4">
        <div>
          <label htmlFor="first-name">First name :</label>
          <input
            className="p-2 border rounded-md mt-2"
            type="text"
            id="first-name"
            placeholder="First name"
            name="firstName"
            required
            aria-describedby="first-name-error"
          />
          {state.error?.firstName && (
            <small id="first-name-error">{state.error.firstName}</small>
          )}
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
            aria-describedby="last-name-error"
          />
          {state.error?.lastName && (
            <small id="last-name-error">{state.error.lastName}</small>
          )}
        </div>
        <AuthForm state={state} />
        <div>
          <label htmlFor="password2">Verify Password :</label>
          <input
            className="p-2 border rounded-md mt-2"
            type="password"
            id="password2"
            placeholder="Verify Password"
            name="password2"
            aria-describedby="password2-error"
          />
          {state.error?.password2 && (
            <small id="password2-error">{state.error.password2}</small>
          )}
        </div>
        <small className="block">
          Already have an account?{" "}
          <Link href={"/auth/signin"}>Sign in here</Link>
        </small>
        {state.message && (
          <small className="text-red-400">{state.message}</small>
        )}
        <button
          className="bg-gray-400 py-2 px-3 rounded-md text-white"
          type="submit"
          disabled={isPending}
        >
          Sign up
        </button>
      </form>
    </main>
  )
}

export default SignupPage
