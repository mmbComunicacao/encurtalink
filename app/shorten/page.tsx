'use client'

import { useState } from 'react'

const Shorten = () => {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    const trimmedLongUrl = longUrl.trim()
    const trimmedShortUrl = shortUrl.trim()

    if (!trimmedLongUrl || !trimmedShortUrl) {
      setError('Preencha ambos os campos corretamente.')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/shorten`,
        {
          method: 'POST',
          body: JSON.stringify({
            longUrl: trimmedLongUrl,
            shortUrl: trimmedShortUrl
          }),
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store'
        }
      )

      if (!res.ok) {
        const errorRes = await res.json().catch(() => null)
        throw new Error(errorRes?.message || 'Erro ao encurtar o link.')
      }

      const data = await res.json()
      setSuccessMessage(`Link encurtado com sucesso: ${data.shortenedUrl}`)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Erro inesperado.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="w-full h-screen flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Encurtador de Links
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="url"
          placeholder="Link original"
          value={longUrl}
          onChange={e => setLongUrl(e.target.value)}
          className="bg-white py-2 px-3 text-gray-900 placeholder:text-gray-500 rounded shadow border"
          required
        />
        <input
          type="text"
          placeholder="Link personalizado"
          value={shortUrl}
          onChange={e => setShortUrl(e.target.value)}
          className="bg-white py-2 px-3 text-gray-900 placeholder:text-gray-500 rounded shadow border"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white font-bold px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Encurtando...' : 'Encurtar'}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && (
          <p className="text-green-600 text-sm">{successMessage}</p>
        )}
      </form>
    </main>
  )
}

export default Shorten
