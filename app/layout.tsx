import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MainNav } from "@/components/main-nav"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "My Mortgage Calculator",
  description: "Modern mortgage and home loan calculators.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-gray-50 antialiased", inter.className)}>
        <header className="border-b bg-white shadow-sm">
          <div className="flex h-16 items-center px-4 max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold text-primary-purple-600 mr-6">My Mortgage Calculator</h1>
            <MainNav />
          </div>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  )
}
