"use client"
import { app } from "@/utils/firebase"
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const navLinks = [
    !loggedInUser && {
      title: "Sign in",
      path: "/auth/signin",
    },
  ]
  const auth = getAuth(app)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUser(user)
      } else {
        setLoggedInUser(null)
      }
    })
  }, [])
  return (
    <nav>
      <Image
        src={"/menu.svg"}
        alt="Menu"
        width={32}
        height={32}
        onClick={() => setIsNavOpen(!isNavOpen)}
      />
      <ul
        className={`${
          !isNavOpen && "translate-x-[500px]"
        } fixed bg-white w-[250px] p-6 shadow-md right-2 z-50 duration-500`}
      >
        {navLinks.map(
          (link) =>
            link && (
              <li key={link.path}>
                <Link href={link.path} onClick={() => setIsNavOpen(false)}>
                  {link.title}
                </Link>
              </li>
            )
        )}
        {loggedInUser && (
          <>
            <li>
              <Link href={`/profile/${loggedInUser.uid}`} onClick={() => setIsNavOpen(false)}>
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={async () => {
                  await signOut(auth)
                  setIsNavOpen(false)
                  redirect("/")
                }}
              >
                Sign out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
