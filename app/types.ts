export type AlbumType = {
  id: number,
  title: string,
  description: string,
  images: ImageType[]
}

export type ImageType = {
  url: string,
  id: number,
  width: number,
  height: number
}