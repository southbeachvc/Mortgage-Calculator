"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MainNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Savings", href: "/" },
    { name: "Borrowing Power", href: "/borrowing" },
    { name: "Repayments", href: "/repayments" },
    { name: "Stamp Duty", href: "/stampduty" },
  ]

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary-purple-600",
            pathname === item.href
              ? "text-primary-purple-600 border-b-2 border-primary-purple-600 pb-1"
              : "text-muted-foreground",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
