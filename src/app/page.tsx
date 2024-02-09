'use client'

import { FormEventHandler, useState } from 'react'
import { Container, Flex, Grid } from '@radix-ui/themes'
import { SymbolForm } from '@/components/SymbolForm'
import { DetailsSection } from '@/components/DetailsSection'
import { ChartSection } from '@/components/ChartSection'
import { useSymbolSearch } from '@/hooks/useSymbolSearch'
import styles from './page.module.css'

const Home = () => {
  const [symbol, setSymbol] = useState('')
  const { submitSearch, result, isLoading, hasError } = useSymbolSearch()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    submitSearch(symbol)
  }

  return (
    <Flex
      asChild
      className={styles.appMain}
      grow="1"
      py={{ initial: '5', md: '8' }}
    >
      <main>
        <Container size="3" px="5">
          <Grid
            columns={{
              initial: '1',
              md: '2',
            }}
          >
            <SymbolForm
              symbol={symbol}
              setSymbol={setSymbol}
              handleSubmit={handleSubmit}
              result={result}
              hasError={hasError}
            />
          </Grid>

          <Grid
            columns={{
              initial: '1',
              sm: '2',
            }}
            mt="5"
            className={styles.content}
          >
            <DetailsSection
              result={result}
              submitSearch={submitSearch}
              setSymbol={setSymbol}
              isLoading={isLoading}
            />
            <ChartSection searchResult={result} isSymbolLoading={isLoading} />
          </Grid>
        </Container>
      </main>
    </Flex>
  )
}

export default Home
