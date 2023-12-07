import { AlbumType, ImageType } from '@/app/types'
import Image from "next/image"
import axios from 'axios'
import React from 'react'

type Props = {
    params: { [key: string]: string },
    searchParams: { [key: string]: string },
}

export default async function Album({ params }: Props) {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/home-page?fields[0]=title&populate[gallery][on][element.album][filters][title]=${params.title}&populate[gallery][on][element.album][populate][images][fields][0]=url&populate[gallery][on][element.album][populate][images][fields][1]=formats`)
    const al = data.data.attributes.gallery[0]
    const album = {
        ...al,
        images: al.images.data.map((image: any) => ({
            id: image.id,
            url: `${process.env.NEXT_PUBLIC_IMAGE_BASE}${image.attributes.url}`,
            width: image.attributes.formats.medium.width,
            height: image.attributes.formats.medium.height
        }))
    } as AlbumType

    return (
        <section className="w-full h-full flex flex-col gap-12">
            <div className="flex flex-col gap-5">
                <h2 className="text-xl">{album.title}</h2>
                <p>{album.description}</p>
            </div>
            <div className="flex gap-3 w-full flex-wrap">
                {
                    album.images.map((image) => (
                        <div className="" key={image.id}>
                            <Image className="aspect-auto" src={image.url} alt={`${params.title} image`} width={image.width} height={image.height} />
                        </div>
                    ))
                }
            </div>
        </section>
    )
}