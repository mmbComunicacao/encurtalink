import Link from 'next/link'

const NotFoundShorUrl = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <div className="text-center mx-auto">
        <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
        <p className="text-lg">Short URL not found.</p>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-lg">Quer criar uma URL personalizada?</p>
        <Link
          href="/shorten"
          className="text-white font-bold py-2 px-4 rounded bg-blue-800"
        >
          Clique aqui
        </Link>
      </div>
    </div>
  )
}

export default NotFoundShorUrl
