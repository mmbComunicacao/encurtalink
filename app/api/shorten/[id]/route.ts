import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET /api/shorten/:shortUrl
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const shortUrl = params.id

  const { data, error } = await supabase
    .from('shortened')
    .select('*')
    .eq('shortUrl', shortUrl)
    .single()

  if (error) {
    return NextResponse.json({ message: 'O link encurtado não foi encontrado' }, { status: 422 })
  }

  return NextResponse.json(data, { status: 200 })
}

// PATCH /api/shorten/:id
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  const { longUrl, shortUrl } = await req.json()

  console.log(id)
  console.log(longUrl, shortUrl)

  const { data, error: updateError } = await supabase
    .from('shortened')
    .update({ longUrl, shortUrl })
    .eq('id', id)
    .select()

  if (updateError) {
    return NextResponse.json({ message: 'Erro ao atualizar o shortUrl' }, { status: 500 })
  }

  return NextResponse.json({ message: 'URL atualizada com sucesso', data }, { status: 200 })
}

// DELETE /api/shorten/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  const { error: deleteError } = await supabase
    .from('shortened')
    .delete()
    .eq('id', id)

  if (deleteError) {
    return NextResponse.json({ message: 'Erro ao excluir o shortUrl' }, { status: 500 })
  }

  return NextResponse.json({ message: 'URL excluída com sucesso' }, { status: 200 })
}
