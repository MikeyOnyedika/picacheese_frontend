import Image from "next/image";
import axios from "axios";
import Header from "./components/Header";
import { Metadata, ResolvingMetadata } from "next";
import Card from "./components/Card";
import { AlbumType } from "./types";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const apiBase = process.env.NEXT_PUBLIC_API_BASE;

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { data } = await axios.get(
      `${apiBase}/home-page?fields[0]=title&populate[metaData][populate][metaImage][fields][0]=url`
    );

    const metadata = {
      title: data.data.attributes.metaData.metaTitle,
      description: data.data.attributes.metaData.metaDescription,
      openGraph: {
        images: [
          `${process.env.NEXT_PUBLIC_IMAGE_BASE}${data.data.attributes.metaData.metaImage.data.attributes.url}`,
        ],
      },
    };

    return metadata;
  } catch (err) {
    return {};
  }
}

export default async function Home({ params, searchParams }: Props) {
  let page: any = null;
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE}/home-page?fields[0]=heroText&fields[1]=title&populate[gallery][on][element.album][populate][images][fields][0]=url`
    );
    page = data.data.attributes;
  } catch (err: any) {
    console.log("err: ", err.message);
  }

  if (!page) {
    return (
      <div className="w-full h-full flex flex-col">
        <main className="flex justify-center items-center w-full h-full">
          <h2 className="text-3xl text-gray-600">
            Error while fetching results
          </h2>
        </main>
      </div>
    );
  }

  const albums = page.gallery.map(function (album: any): AlbumType {
    return {
      id: album.id,
      title: album.title,
      description: album.description,
      images: album.images.data || [],
    };
  }) as AlbumType[];

  console.log("albums: ", albums);

  // if (!albums){
  //   return (
  //     <div className="w-full h-full flex flex-col">
  //       <main className="flex justify-center items-center w-full h-full">
  //         <h2 className="text-3xl text-gray-600">Error while fetching results</h2>
  //       </main>
  //     </div>
  //   )
  // }

  return (
    <section className="w-full h-full flex flex-col gap-12">
      <p className="text-lg">{page.heroText}</p>
      <div className="w-full flex flex-col gap-8">
        <h3 className="text-2xl text-orange-950 text-center">Albums</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {albums.map((album) => {
            return (
              <Card
                key={album.id}
                url={`/albums/${album.title}`}
                title={album.title}
                description={album.description}
                photoCount={album.images.length}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
