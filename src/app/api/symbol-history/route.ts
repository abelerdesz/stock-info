import { AlphaVantageService } from '@/services/AlphaVantageService'
import { type NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const symbolQuery = request.nextUrl.searchParams.get('symbol')

  if (symbolQuery?.length) {
    try {
      const history = await AlphaVantageService.getHistoryForSymbol(
        decodeURIComponent(symbolQuery)
      )

      return Response.json(history)
    } catch (e) {
      return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } else {
    return Response.json({ error: 'Bad Request' }, { status: 400 })
  }
}
