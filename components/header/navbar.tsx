"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const navLinks = [{ title: "Sign in", path: "/auth/signin" }]
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
        {navLinks.map((link) => (
          <li key={link.path}>
            <Link href={link.path} onClick={() => setIsNavOpen(false)}>
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
