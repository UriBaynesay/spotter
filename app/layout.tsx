import type { Metadata } from "next"
import { Kanit } from "next/font/google"
import "./globals.css"
import AppHeader from "@/components/header/app-header"
import AppFooter from "@/components/app-footer"

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Spotter",
  description: "Your best workout body",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${kanit.className} text-gray-800 antialiased min-h-dvh flex flex-col px-2 tracking-wide`}
      >
        <AppHeader />
        {children}
        <AppFooter />
      </body>
    </html>
  )
}
