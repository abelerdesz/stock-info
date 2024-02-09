'use client'

import { FormEventHandler } from 'react'
import { Button, Text, TextField } from '@radix-ui/themes'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { type SymbolSearchResponse } from '@/types/SymbolSearchResponse'

interface Props {
  symbol: string
  setSymbol: (symbol: string) => void
  handleSubmit: FormEventHandler<HTMLFormElement>
  result: SymbolSearchResponse | null
  hasError: boolean
}

export const SymbolForm = ({
  symbol,
  setSymbol,
  handleSubmit,
  result,
  hasError,
}: Props) => {
  const { allResults, exactMatch } = result || {}

  return (
    <form onSubmit={handleSubmit}>
      <Text as="label" htmlFor="ticker-input" color="gray" size="2">
        Enter ticker symbol
      </Text>
      <TextField.Root mt="2">
        <TextField.Input
          id="ticker-input"
          size="3"
          placeholder="Ex. NFLX"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          variant="soft"
          color={hasError || (allResults && !exactMatch) ? 'red' : 'gray'}
        />
        <TextField.Slot pr="0">
          <Button
            radius="none"
            size="3"
            variant="soft"
            color="gray"
            type="submit"
            disabled={!symbol.length}
          >
            Search
            <MagnifyingGlassIcon height="16" width="16" />
          </Button>
        </TextField.Slot>
      </TextField.Root>
    </form>
  )
}
