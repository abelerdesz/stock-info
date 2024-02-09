import { SymbolSearchResponse } from '@/types/SymbolSearchResponse'
import { useState } from 'react'

export const useSymbolSearch = () => {
  const [isLoading, setLoading] = useState(false)
  const [hasError, setError] = useState(false)
  const [result, setResult] = useState<SymbolSearchResponse | null>(null)

  const submitSearch = async (symbol: string) => {
    setLoading(true)
    setError(false)
    setResult(null)

    const resp = await fetch(
      `/api/search-symbol/?symbol=${encodeURIComponent(symbol)}`
    )

    if (resp.ok) {
      const parsedResponse = (await resp.json()) as SymbolSearchResponse
      setResult(parsedResponse)
    } else {
      setError(true)
    }

    setLoading(false)
  }

  return {
    submitSearch,
    result,
    isLoading,
    hasError,
  }
}
