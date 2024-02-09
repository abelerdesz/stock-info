'use client'

import { Box, Button, Callout, Flex, Text } from '@radix-ui/themes'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { SymbolSearchResponse } from '@/types/SymbolSearchResponse'

interface Props {
  result: SymbolSearchResponse | null
  submitSearch: (symbol: string) => Promise<void>
  setSymbol: (symbol: string) => void
}

export const DetailsMisc = ({ result, submitSearch, setSymbol }: Props) => {
  const { allResults, exactMatch } = result || {}
  const relatedCompanies = allResults?.slice(0, 4)

  return (
    <Flex direction="column" grow="0">
      {allResults && !exactMatch && (
        <Box mb="5">
          <Callout.Root color="ruby">
            <Callout.Icon>
              <ExclamationTriangleIcon />
            </Callout.Icon>
            <Callout.Text>No matching stock was found.</Callout.Text>
          </Callout.Root>
        </Box>
      )}

      {!!allResults?.length && (
        <Text size="2" color="gray" mb="2">
          Similar companies
        </Text>
      )}

      <Flex gap="1">
        {relatedCompanies?.map((result) => (
          <Button
            size="1"
            key={result.symbol}
            variant="soft"
            onClick={() => {
              setSymbol(result.symbol)
              submitSearch(result.symbol)
            }}
          >
            {result.symbol}
          </Button>
        ))}
      </Flex>
    </Flex>
  )
}
