"use client"

import { app } from "@/utils/firebase"
import { getAuth } from "firebase/auth"
import Link from "next/link"

type Props = {
  authId: string
}

function UpdateProfileLink({ authId }: Props) {
  const { currentUser } = getAuth(app)

  return (
    <>
      {currentUser?.uid === authId&&<Link href={`${authId}/update`}>Update profile</Link>}
    </>
  )
}

export default UpdateProfileLink
