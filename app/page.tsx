import Image from 'next/image'
import axios from 'axios'
import Header from './components/Header'

export default async function Home() {
  let page: any = null
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE}/home-page`)
    console.log("pages: ", data)
  } catch (err) {
    console.log("err: ", err)
  }

  if (!page){
    return (
    <div>
      <Header />
      <main>
        <h2 className="">Error while fetching results</h2>
      </main>
    </div>
    )
  }

  return (
    <div>
      <Header />
      <main>hello main</main>
    </div>
  )
}
