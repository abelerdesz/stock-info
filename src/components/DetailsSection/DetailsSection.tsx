'use client'

import {
  AspectRatio,
  Badge,
  Callout,
  Flex,
  Heading,
  Separator,
  Text,
} from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { SecondaryDetails } from './SecondaryDetails'
import { DetailsMisc } from './DetailsMisc/DetailsMisc'
import { type SymbolSearchResponse } from '@/types/SymbolSearchResponse'
import styles from './DetailsSection.module.css'

export interface Props {
  submitSearch: (symbol: string) => Promise<void>
  setSymbol: (symbol: string) => void
  isLoading?: boolean
  result: SymbolSearchResponse | null
}

export const DetailsSection = (props: Props) => {
  const { result, isLoading } = props
  const { exactMatch } = result || {}

  return (
    <Flex asChild>
      <section>
        <AspectRatio ratio={2 / 1}>
          <Flex
            direction="column"
            height="100%"
            p="5"
            className={`${styles.figures} ${isLoading ? styles.skeleton : ''}`}
          >
            {!result && !isLoading && (
              <Flex justify="center" align="center" grow="1">
                <Callout.Root color="gray">
                  <Callout.Icon>
                    <InfoCircledIcon />
                  </Callout.Icon>
                  <Callout.Text>
                    Search for a stock to see its details.
                  </Callout.Text>
                </Callout.Root>
              </Flex>
            )}

            {exactMatch && (
              <Flex className={styles.figures} grow="1">
                <Flex grow="1" justify="between">
                  <Flex direction="column">
                    <Badge size="1" variant="solid" color="jade">
                      {exactMatch.description}
                    </Badge>
                    <Heading as="h2" mt="3" color="gray">
                      {exactMatch.symbol}
                    </Heading>
                    <Text
                      weight="bold"
                      color={exactMatch.quote.d > 0 ? 'jade' : 'red'}
                      size="4"
                      mt="2"
                    >
                      {exactMatch.quote.c}
                    </Text>
                  </Flex>
                  <SecondaryDetails exactMatch={exactMatch} />
                </Flex>
              </Flex>
            )}
            <DetailsMisc {...props} />
          </Flex>
        </AspectRatio>
        <Separator
          orientation="vertical"
          size="4"
          className={styles.separator}
        />
      </section>
    </Flex>
  )
}
