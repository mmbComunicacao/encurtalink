import { redirect } from 'next/navigation'
import NotFoundShorUrl from './_components/NotFoundShorUrl'

export default async function RedirectPage({
  params
}: {
  params: Promise<{ shortUrl: string }>
}) {
  const { shortUrl } = await params
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${shortUrl}`,
    {
      cache: 'no-store'
    }
  )

  if (!res.ok) {
    // Se quiser, pode exibir uma página de erro personalizada
    return <NotFoundShorUrl />
  }

  const result = await res.json()
  if (!result.data) return <NotFoundShorUrl />

  const { data } = result
  console.log(data)

  redirect(data.longUrl) // redireciona para o destino real
}
