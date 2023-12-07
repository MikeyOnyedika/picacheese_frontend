import React from 'react'
import Link from 'next/link'

const Card = ({ url, title, description, photoCount }: {
    url: string,
    title: string,
    description: string,
    photoCount: number
}) => {
    const state = new Intl.PluralRules().select(photoCount)
    console.log("isSingular: ", state)
    let photoText = ""

    if (state === "one"){
        photoText = `${photoCount} photo`
    }else{
        photoText = `${photoCount} photos`
    }

    return (
        <Link href={url} className="rounded-md shadow-md border-2 border-orange-300 bg-orange-100 flex flex-col gap-3 p-4 transition-all duration-200 hover:bg-orange-200 cursor-pointer">
            <h3 className="text-gray-900 text-lg line-clamp-2">{ title }</h3>
            <p className="line-clamp-2 text-gray-500">{ description }</p>
            <p className="flex justify-end text-orange-800">{ photoText }</p>
        </Link>
    )
}

export default Card