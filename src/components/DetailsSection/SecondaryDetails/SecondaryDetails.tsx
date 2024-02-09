'use client'

import { Flex, Text } from '@radix-ui/themes'
import { FinnhubSymbolSearchResult } from '@/types/FinnhubSymbolSearchResponse'
import { FinnhubQuoteResponse } from '@/types/FinnhubQuoteResponse'

interface Props {
  exactMatch: FinnhubSymbolSearchResult & {
    quote: FinnhubQuoteResponse
  }
}

export const SecondaryDetails = ({ exactMatch }: Props) => {
  return (
    <Flex direction="column">
      <Flex justify="between" gap="3">
        <Text size="2" color="gray">
          Previous close:
        </Text>
        <Text size="2" color="gray">
          <strong>{exactMatch.quote.pc.toFixed(2)}</strong>
        </Text>
      </Flex>
      <Flex justify="between" mt="1">
        <Text size="2" color="gray">
          Today&apos;s open:
        </Text>
        <Text size="2" color="gray">
          <strong>{exactMatch.quote.o.toFixed(2)}</strong>
        </Text>
      </Flex>
      <Flex justify="between" mt="1">
        <Text size="2" color="gray">
          Today&apos;s high:
        </Text>
        <Text size="2" color="gray">
          <strong>{exactMatch.quote.h.toFixed(2)}</strong>
        </Text>
      </Flex>
      <Flex justify="between" mt="1">
        <Text size="2" color="gray">
          Today&apos;s low:
        </Text>
        <Text size="2" color="gray">
          <strong>{exactMatch.quote.l.toFixed(2)}</strong>
        </Text>
      </Flex>
    </Flex>
  )
}
