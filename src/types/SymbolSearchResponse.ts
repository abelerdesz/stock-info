import { FinnhubQuoteResponse } from './FinnhubQuoteResponse'
import { FinnhubSymbolSearchResult } from './FinnhubSymbolSearchResponse'

export interface SymbolSearchResponse {
  count: number
  allResults: FinnhubSymbolSearchResult[]
  exactMatch:
    | (FinnhubSymbolSearchResult & {
        quote: FinnhubQuoteResponse
      })
    | null
}
