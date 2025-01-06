"use client"

import Link from "next/link"
import { useActionState } from "react"
import { signInAction } from "../actions"
import AuthForm from "@/components/auth/auth-form"

function SigninPage() {
  const [state, formAction, isPending] = useActionState(signInAction, {
    error: {},
    message: null,
  })
  return (
    <main className="mt-3">
      <h3 className="text-4xl text-center">Sign in</h3>
      <form className="mx-auto w-[70vw] mt-6 [&>*]:mt-4" action={formAction}>
        <AuthForm state={state}/>
        <small className="block">
          Didn&apos;t signup yet?{" "}
          <Link href={"/auth/signup"}>Sign up here</Link>
        </small>
        {state.message && (
          <small className="text-red-400">{state.message}</small>
        )}
        <button
          className="bg-gray-400 py-2 px-3 rounded-md text-white"
          type="submit"
          disabled={isPending}
        >
          Sign in
        </button>
      </form>
    </main>
  )
}

export default SigninPage
