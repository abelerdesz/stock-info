import { FinnhubQuoteResponse } from './FinnhubQuoteResponse'
import { FinnhubSymbolSearchResponse } from './FinnhubSymbolSearchResponse'

export interface SymbolSearchResponse extends FinnhubSymbolSearchResponse {
  quote?: FinnhubQuoteResponse
}
