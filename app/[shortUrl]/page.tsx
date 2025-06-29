import { redirect } from 'next/navigation'

export default async function RedirectPage({ params }: { params: { shortUrl: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${params.shortUrl}`, {
    cache: 'no-store',
  })
  
  if (!res.ok) {
    // Se quiser, pode exibir uma página de erro personalizada
    return <div>URL não encontrada</div>
  }
  
  const data = await res.json()
  // console.log(data)

  // redirect(data.longUrl) // redireciona para o destino real
}
