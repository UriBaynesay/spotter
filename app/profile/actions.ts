"use server"

import { redirect } from "next/navigation"
import { getProfileByAuthId } from "./db"
import { Profile } from "./interface"

export const getProfileByAuthIdAction = async (authId: string) => {
  let profile!: Profile
  try {
    profile = await getProfileByAuthId(authId)
    if (!profile) redirect("/auth/signin")
  } catch (error) {
    console.log(error)
  }
  redirect(`/profile/${profile.id}`)
}
