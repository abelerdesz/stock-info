const finnhub = require('finnhub')
import { promisify } from 'util'
import type {
  FinnhubSymbolSearchResponse,
  FinnhubSymbolSearchResult,
} from '@/types/FinnhubSymbolSearchResponse'
import type { FinnhubQuoteResponse } from '@/types/FinnhubQuoteResponse'
import { SymbolSearchResponse } from '@/types/SymbolSearchResponse'

finnhub.ApiClient.instance.authentications['api_key'].apiKey =
  process.env.FINNHUB_API_KEY

export class FinnhubService {
  private static client = new finnhub.DefaultApi()

  private static vendorApi = {
    searchSymbol: promisify<
      (query: string) => Promise<FinnhubSymbolSearchResponse>
    >(this.client.symbolSearch).bind(this.client),

    getQuote: promisify<(symbol: string) => Promise<FinnhubQuoteResponse>>(
      this.client.quote
    ).bind(this.client),
  }

  private static filterResults(
    query: string,
    results: FinnhubSymbolSearchResult[]
  ): FinnhubSymbolSearchResult[] {
    // Some of the results come without quote information,
    // so it made sense to filter them out
    return results.filter(
      (result) =>
        result.symbol.toUpperCase() !== query.toUpperCase() &&
        !result.symbol.includes('.') &&
        !result.symbol.includes(':')
    )
  }

  static async searchSymbol(query: string): Promise<SymbolSearchResponse> {
    try {
      const lookupResponse = await this.vendorApi.searchSymbol(query)

      if (lookupResponse.result.length) {
        const exactMatch = lookupResponse.result.find(
          (match) => match.symbol.toUpperCase() === query.toUpperCase()
        )

        if (exactMatch) {
          const quoteResponse = await this.vendorApi.getQuote(query)
          return {
            count: lookupResponse.count,
            allResults: this.filterResults(query, lookupResponse.result),
            exactMatch: { ...exactMatch, quote: quoteResponse },
          }
        } else {
          return {
            count: lookupResponse.count,
            allResults: this.filterResults(query, lookupResponse.result),
            exactMatch: null,
          }
        }
      } else {
        return { allResults: [], count: 0, exactMatch: null }
      }
    } catch (e) {
      throw new Error('Failed to fetch stock information')
    }
  }
}
