const finnhub = require('finnhub')
import { promisify } from 'util'
import type { FinnhubSymbolSearchResponse } from '@/types/FinnhubSymbolSearchResponse'
import type { FinnhubQuoteResponse } from '@/types/FinnhubQuoteResponse'
import { SymbolSearchResponse } from '@/types/SymbolSearchResponse'

finnhub.ApiClient.instance.authentications['api_key'].apiKey =
  process.env.FINNHUB_API_KEY

export class FinnhubService {
  private static client = new finnhub.DefaultApi()

  private static vendorApi = {
    searchSymbol: promisify<
      (symbol: string) => Promise<FinnhubSymbolSearchResponse>
    >(this.client.symbolSearch).bind(this.client),

    getQuote: promisify<(symbol: string) => Promise<FinnhubQuoteResponse>>(
      this.client.quote
    ).bind(this.client),
  }

  static async searchSymbol(query: string): Promise<SymbolSearchResponse> {
    try {
      const lookupResponse = await this.vendorApi.searchSymbol(query)

      if (Number(lookupResponse.count)) {
        const quoteResponse = await this.vendorApi.getQuote(query)
        return { ...lookupResponse, quote: quoteResponse }
      } else {
        return { result: [], count: 0 }
      }
    } catch (e) {
      throw new Error('Failed to fetch stock information')
    }
  }
}
