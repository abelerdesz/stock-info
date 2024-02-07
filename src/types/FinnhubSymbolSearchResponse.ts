export interface FinnhubSymbolSearchResult {
  description: string
  displaySymbol: string
  symbol: string
  type: string
}

export interface FinnhubSymbolSearchResponse {
  count: number
  result: FinnhubSymbolSearchResult[]
}
