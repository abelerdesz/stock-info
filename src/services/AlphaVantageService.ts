import { HistoryResponse } from '@/types/HistoryResponse'

export class AlphaVantageService {
  private static TIME_SERIES_LENGTH = 7

  private static transformResponse(
    rawHistory: AlphaVantageHistoryResponse
  ): HistoryResponse {
    return Object.entries(rawHistory['Time Series (Daily)'])
      .map(([date, value]) => ({
        timestamp: new Date(date).getTime(),
        quotes: {
          open: Number(value['1. open']),
          close: Number(value['4. close']),
          high: Number(value['2. high']),
          low: Number(value['3. low']),
        },
      }))
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, this.TIME_SERIES_LENGTH)
      .reverse()
  }

  static async getHistoryForSymbol(symbol: string): Promise<HistoryResponse> {
    try {
      const resp = await fetch(
        process.env.ALPHA_VANTAGE_API_URL +
          '?' +
          new URLSearchParams({
            symbol,
            apikey: process.env.ALPHA_VANTAGE_API_KEY as string,
            function: 'TIME_SERIES_DAILY',
          })
      )
      const rawHistory = await resp.json()
      return this.transformResponse(rawHistory)
    } catch (e) {
      throw new Error('Failed to fetch stock history')
    }
  }
}
