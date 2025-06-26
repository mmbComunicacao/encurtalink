import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { originalUrl } = body

  const shortCode = generateShortCode()

  // Salvar no banco (ou localmente por enquanto)

  return NextResponse.json({ shortUrl: `https://teudominio.com/${shortCode}` })
}

function generateShortCode(): string {
  return Math.random().toString(36).substring(2, 8)
}
