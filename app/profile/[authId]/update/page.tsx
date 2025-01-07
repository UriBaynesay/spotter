"use client"

import { app } from "@/utils/firebase"
import { getAuth } from "firebase/auth"
import {
  collection,
  DocumentData,
  DocumentReference,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore"
import Link from "next/link"
import { redirect, useParams } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

function UpdateProfilePage() {
  const [profile, setProfile] = useState<DocumentData | null>(null)
  const params = useParams<{ authId: string }>()
  const { currentUser } = getAuth(app)

  const handleChange = (ev: FormEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [ev.currentTarget.name]: ev.currentTarget.value })
  }

  const handleSubmit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = new FormData(ev.target as HTMLFormElement)
    const querySnapshot = await getProfileDocument()
    const profileRef = querySnapshot.docs.at(0)?.ref as DocumentReference
    await updateDoc(profileRef, {
      email: form.get("email"),
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
    })
    redirect(`/profile/${params.authId}`)
  }

  const getProfileDocument = () => {
    const db = getFirestore(app)
    const q = query(
      collection(db, "profile"),
      where("authId", "==", params.authId)
    )
    return getDocs(q)
  }

  const getProfile = async () => {
    const querySnapshot = await getProfileDocument()
    if (querySnapshot.size)
      setProfile(querySnapshot.docs.at(0)?.data() as DocumentData)
  }
  useEffect(() => {
    if (!profile) getProfile()
  }, [])

  return (
    <main>
      <h2 className="mt-6 text-4xl">Update profile</h2>
      {profile ? (
        params.authId === currentUser?.uid ? (
          <form className="mt-6 mx-4 [&>*]:mt-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email :</label>
              <input
                className="p-2 border rounded-md mt-2"
                id="email"
                type="email"
                placeholder="Email"
                name="email"
                value={profile?.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="first-name">First name :</label>
              <input
                className="p-2 border rounded-md mt-2"
                type="text"
                id="first-name"
                placeholder="First name"
                name="firstName"
                value={profile?.firstName || ""}
                onChange={handleChange}
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
                value={profile?.lastName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <button
              
              type="submit"
            >
              Update
            </button>
          </form>
        ) : (
          <h2 className="text-2xl text-gray-500">
            You&apos;re not allowed to update this profile.
            <br /> If this is your profile please Sign in{" "}
            <Link href={`/auth/signin`}>here</Link>.
          </h2>
        )
      ) : (
        <></>
      )}
    </main>
  )
}

export default UpdateProfilePage
