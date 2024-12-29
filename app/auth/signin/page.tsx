"use client"

import Link from "next/link"
import { FormEvent, useState, useTransition } from "react"
import { signInAction } from "../actions"
import { redirect } from "next/navigation"

function SigninPage() {
  const [formMessage, setFormMessage] = useState<string | null>(null)
  const [isPending, startSubmit] = useTransition()
  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = new FormData(ev.target as HTMLFormElement)
    startSubmit(async () => {
      const profile = await signInAction(form)
      if (profile) {
        window.sessionStorage.setItem("profile", JSON.stringify(profile))
        redirect("/profile/" + profile.id)
      } else {
        setFormMessage("Email or password were incorrect try again")
      }
    })
  }
  return (
    <main className="mt-3">
      <h3 className="text-4xl text-center">Sign in</h3>
      <form
        className="mx-auto w-[70vw] mt-6 [&>*]:mt-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="email">Email :</label>
          <input
            className="p-2 border rounded-md mt-2"
            id="email"
            type="email"
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password1">Password :</label>
          <input
            className="p-2 border rounded-md mt-2"
            type="password"
            id="password1"
            placeholder="Password"
            name="password1"
            required
          />
        </div>
        <small className="block">
          Didn&apos;t signup yet?{" "}
          <Link href={"/auth/signup"}>Sign up here</Link>
        </small>
        {formMessage && <small className="text-red-400">{formMessage}</small>}
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
