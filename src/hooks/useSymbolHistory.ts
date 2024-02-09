import { HistoryResponse } from '@/types/HistoryResponse'
import { useEffect, useState } from 'react'

export const useSymbolHistory = (symbol?: string, isLoading?: boolean) => {
  const [hasError, setError] = useState(false)
  const [history, setHistory] = useState<HistoryResponse>([])

  useEffect(() => {
    if (isLoading) setHistory([])
  }, [isLoading])

  useEffect(() => {
    const makeRequest = async () => {
      const resp = await fetch(
        `/api/symbol-history/?symbol=${encodeURIComponent(symbol!)}`
      )

      if (resp.ok) {
        const parsedResponse = (await resp.json()) as HistoryResponse
        setHistory(parsedResponse)
      } else {
        setError(true)
      }
    }

    if (symbol?.length) {
      makeRequest()
    }
  }, [symbol])

  return {
    history,
    hasError,
  }
}
