"use server"

import { app } from "@/utils/firebase"
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth"
import { redirect } from "next/navigation"
import { z } from "zod"
import { createProfile, getProfileByAuthId } from "../profile/db"

const INPUT_ERROR_MESSAGES = {
  validName: "Please enter a valid name",
}

export type authState = {
  message?: string | null
  error?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    password1?: string[]
    password2?: string[]
  }
}

const authSchema = z.object({
  firstName: z.string({
    invalid_type_error: INPUT_ERROR_MESSAGES.validName,
    required_error: "First name is required",
  }),
  lastName: z.string({
    invalid_type_error: INPUT_ERROR_MESSAGES.validName,
    required_error: "First name is required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({ message: "Please enter a valid email" }),
  password1: z.string(),
  password2: z.string(),
})

export const signUpAction = async (
  state: authState,
  formData: FormData
): Promise<authState> => {
  const parsedInputs = authSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password1: formData.get("password1"),
    password2: formData.get("password2"),
  })
  if (parsedInputs.error)
    return {
      message: "Invalid inputs",
      error: parsedInputs.error.flatten().fieldErrors,
    }
  if (parsedInputs.data.password1 != parsedInputs.data.password2)
    return { message: "Passwords don't match" }
  const { firstName, lastName, email, password1 } = parsedInputs.data
  const auth = getAuth(app)

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password1
    )
    await createProfile(firstName, lastName, email, user.uid)
  } catch (error) {
    console.log(error)
    return { message: "Wasnt able to sign up" }
  }
  redirect("/auth/signin")
}

const signinSchema = authSchema.omit({
  firstName: true,
  lastName: true,
  password2: true,
})
export const signInAction = async (
  state: authState,
  formData: FormData
): Promise<authState> => {
  const parsedInputs = signinSchema.safeParse({
    email: formData.get("email"),
    password1: formData.get("password1"),
  })
  if (parsedInputs.error)
    return {
      message: "Invalid inputs",
      error: parsedInputs.error.flatten().fieldErrors,
    }
  const { email, password1 } = parsedInputs.data
  let user!: User
  const auth = getAuth(app)
  try {
    user = (await signInWithEmailAndPassword(auth, email, password1)).user
  } catch (error) {
    console.log(error)
    return { message: "The email and password you passed in are incorrect." }
  }
  const profile = await getProfileByAuthId(user.uid)
  redirect(`/profile/${profile.authId}`)
}
