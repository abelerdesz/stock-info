'use client'

import {
  AspectRatio,
  Badge,
  Box,
  Button,
  Callout,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Separator,
  Text,
  TextField,
} from '@radix-ui/themes'
import styles from './page.module.css'
import { FormEventHandler, useState } from 'react'
import {
  BarChartIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons'
import { QueryStatsIcon } from '@/components/Icon/QueryStatsIcon'
import { useSymbolSearch } from '@/hooks/useSymbolSearch'
import { useSymbolHistory } from '@/hooks/useSymbolHistory'
import { Chart } from '@/components/Chart'

const Home = () => {
  const [symbol, setSymbol] = useState('')
  const { submitSearch, result, isLoading, hasError } = useSymbolSearch()
  const { count: resultCount, allResults, exactMatch } = result || {}
  const { history } = useSymbolHistory(exactMatch?.symbol, isLoading)

  console.log('history', history)

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submitSearch(symbol)
  }

  console.log('allResults', allResults)

  return (
    <Flex asChild className={styles.appMain} grow="1" py="8">
      <main>
        <Container size="3" px="4">
          <Grid
            columns={{
              initial: '1',
              md: '2',
            }}
          >
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
                  color={
                    hasError || (allResults && !exactMatch) ? 'red' : 'gray'
                  }
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
          </Grid>
          <Grid
            columns={{
              initial: '1',
              sm: '2',
            }}
            mt="5"
            className={styles.content}
          >
            <Flex asChild>
              <section>
                <AspectRatio ratio={2 / 1}>
                  <Flex
                    direction="column"
                    height="100%"
                    p="5"
                    className={`${styles.figures} ${
                      isLoading ? styles.skeleton : ''
                    }`}
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
                          <Flex direction="column">
                            <Flex justify="between" gap="3">
                              <Text size="2" color="gray">
                                Previous close:
                              </Text>
                              <Text size="2" color="gray">
                                <strong>
                                  {exactMatch.quote.pc.toFixed(2)}
                                </strong>
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
                        </Flex>
                      </Flex>
                    )}
                    <Flex direction="column" grow="0">
                      {allResults && !exactMatch && (
                        <Box mb="5">
                          <Callout.Root color="ruby">
                            <Callout.Icon>
                              <ExclamationTriangleIcon />
                            </Callout.Icon>
                            <Callout.Text>
                              No matching stock was found.
                            </Callout.Text>
                          </Callout.Root>
                        </Box>
                      )}
                      {!!allResults?.length && (
                        <Text size="2" color="gray" mb="2">
                          Similar companies
                        </Text>
                      )}
                      <Flex gap="1">
                        {allResults?.slice(0, 4).map((result) => (
                          <Button
                            size="1"
                            key={result.symbol}
                            // color="indigo"
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
                  </Flex>
                </AspectRatio>
                <Separator
                  orientation="vertical"
                  size="4"
                  className={styles.separator}
                />
              </section>
            </Flex>
            <Flex asChild>
              <section>
                <AspectRatio ratio={1 / 1}>
                  <Box className={styles.chart} p="3">
                    {!history.length && (
                      <QueryStatsIcon
                        width={120}
                        height={120}
                        className={styles.chartIcon}
                      />
                    )}
                    {!!history.length && (
                      <Card
                        size="2"
                        variant="surface"
                        className={styles.chartCard}
                      >
                        <Chart data={history} />
                      </Card>
                    )}
                  </Box>
                </AspectRatio>
              </section>
            </Flex>
          </Grid>
        </Container>
      </main>
    </Flex>
  )
}

export default Home
