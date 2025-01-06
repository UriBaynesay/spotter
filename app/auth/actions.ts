"use server"

import { redirect } from "next/navigation"
import { z } from "zod"
import { createProfile } from "../profile/db"

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

const createProfileSchema = authSchema.omit({
  password1: true,
  password2: true,
})
export const createProfileAction = async (
  authId: string,
  formData: FormData
) => {
  const parsedInputs = createProfileSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
  })
  if (parsedInputs.error) return
  const { firstName, lastName, email } = parsedInputs.data
  try {
    await createProfile(firstName, lastName, email, authId)
  } catch (error) {
    console.log(error)
    return
  }
  redirect("/auth/signin")
}
