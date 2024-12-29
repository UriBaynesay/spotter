import Link from "next/link"
import Navbar from "./navbar"

function AppHeader() {
  return (
    <header className="flex justify-between items-center">
      <Link className="hover:no-underline" href={"/"}>
        <h1 className="text-6xl">Spotter</h1>
      </Link>
      <Navbar />
    </header>
  )
}

export default AppHeader
