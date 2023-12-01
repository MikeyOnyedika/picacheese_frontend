import type { Metadata } from 'next'
import { Space_Grotesk } from "next/font/google"
import './globals.css'

const spaceGr = Space_Grotesk({ subsets: ['latin']  })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={spaceGr.className}>{children}</body>
    </html>
  )
}
