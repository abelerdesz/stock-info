import { FinnhubService } from '@/services/FinnhubService'
import { type NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const symbolQuery = request.nextUrl.searchParams.get('symbol')

  if (symbolQuery?.length) {
    try {
      const searchResult = await FinnhubService.searchSymbol(
        decodeURIComponent(symbolQuery)
      )

      return Response.json(searchResult)
    } catch (e) {
      return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } else {
    return Response.json({ error: 'Bad Request' }, { status: 400 })
  }
}
