"use client"

import AuthForm from "@/components/auth/auth-form"
import { app } from "@/utils/firebase"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { FormEvent } from "react"

function SigninPage() {
  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const auth = getAuth(app)
    const form = new FormData(ev.target as HTMLFormElement)
    try {
      await signInWithEmailAndPassword(
        auth,
        form.get("email") as string,
        form.get("password1") as string
      )
    } catch (error) {
      console.log(error)
    }
    redirect(`/profile/${auth.currentUser?.uid}`)
  }
  return (
    <main className="mt-3">
      <h3 className="text-4xl text-center">Sign in</h3>
      <form
        className="mx-auto w-[70vw] mt-6 [&>*]:mt-4"
        onSubmit={handleSubmit}
      >
        <AuthForm />
        <small className="block">
          Didn&apos;t signup yet?{" "}
          <Link href={"/auth/signup"}>Sign up here</Link>
        </small>

        <button
          
          type="submit"
        >
          Sign in
        </button>
      </form>
    </main>
  )
}

export default SigninPage
