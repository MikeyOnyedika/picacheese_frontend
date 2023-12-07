import type { Metadata } from 'next'
import { Space_Grotesk } from "next/font/google"
import './globals.css'
import Header from './components/Header'

const spaceGr = Space_Grotesk({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`w-screen h-screen flex justify-center ${spaceGr.className}`}>
        <div className='w-full h-full max-w-[1200px] flex flex-col gap-12'>
          <Header />
          <main className="flex flex-col w-full p-3">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
