import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(req: NextRequest, { params }: { params: { shortUrl: string } }) {
  const shortUrl = params.shortUrl

  console.log(shortUrl);
  
  const { data, error } = await supabase
    .from('shortened')
    .select('*')
    .eq('shortUrl', shortUrl)
    .single()

  console.log(data)
  if (error || !data) {
    return NextResponse.json({ message: 'O shortUrl não foi encontrado' }, { status: 422 })
  }

  // Atualiza os cliques
  // await supabase
  //   .from('shortened')
  //   .update({ clicks: data.clicks + 1 })
  //   .eq('id', data.id)

  // Retorna os dados (não redireciona aqui)
  return NextResponse.json(data, { status: 200 })
}
