import { FinnhubService } from '@/services/FinnhubService'
import { type NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const symbolQuery = request.nextUrl.searchParams.get('symbol')

  if (symbolQuery?.length) {
    try {
      const lookupResponse = await FinnhubService.searchSymbol(symbolQuery)
      return Response.json(lookupResponse)
    } catch (e) {
      console.log(e)
      return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
  } else {
    return Response.json({ error: 'Bad Request' }, { status: 400 })
  }
}
