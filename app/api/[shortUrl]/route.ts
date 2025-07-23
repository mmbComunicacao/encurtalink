import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface RouteParams {
  params: Promise<{ shortUrl: string }>
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  const { shortUrl } = await params

  try {
    const { data, error } = await supabase
      .from('shortener')
      .select('*')
      .eq('shortUrl', shortUrl)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { message: 'O shortUrl não foi encontrado' },
        { status: 422 }
      )
    }

    // Atualiza os cliques
    await supabase
      .from('shortener')
      .update({ clicks: data.clicks + 1 })
      .eq('id', data.id)

    // Retorna os dados (não redireciona aqui)
    return NextResponse.json(
      { message: 'Erro ao buscar o shortUrl', data },
      { status: 200 }
    )
  } catch (error) {
    NextResponse.json(
      { message: 'Erro ao buscar o shortUrl', error },
      { status: 400 }
    )
  }
}
