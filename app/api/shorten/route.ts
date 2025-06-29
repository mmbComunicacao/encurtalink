import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { longUrl, shortUrl } = body

  if (!longUrl || !shortUrl) {
    return NextResponse.json(
      { error: 'longUrl e shortUrl são obrigatórias' },
      { status: 422 }
    )
  }

  const { error } = await supabase.from('shortened').insert({
    longUrl,
    shortUrl,
    clicks: 0,
  })

  if (error) {
    console.error('Erro ao encurtar link:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  console.log('Link encurtado com sucesso')
  return NextResponse.json({ message: 'Link encurtado com sucesso' }, { status: 201 })

}

export async function GET() {
  const { data, error } = await supabase.from('shortened').select('*')

  if (error) {
    console.error('Erro ao buscar links encurtados:', error.message)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 200 })
}
