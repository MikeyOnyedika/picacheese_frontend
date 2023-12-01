import React from 'react'
import Header from './components/Header'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <main className="flex flex-col gap-3 w-full h-full justify-center items-center p-3">
                <p className="text-3xl">
                    Page Not Found
                </p>
                <Link href={"/"} className="bg-orange-200 text-gray-700 rounded-full px-3 py-1.5 text-base">go home</Link>
            </main>

        </div>
    )
}