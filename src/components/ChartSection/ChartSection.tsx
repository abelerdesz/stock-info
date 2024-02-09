'use client'

import { AspectRatio, Box, Card, Flex } from '@radix-ui/themes'
import { Chart } from '@/components/Chart'
import { QueryStatsIcon } from '@/components/Icon'
import { useSymbolHistory } from '@/hooks/useSymbolHistory'
import { type SymbolSearchResponse } from '@/types/SymbolSearchResponse'
import styles from './chartSection.module.css'

interface Props {
  searchResult: SymbolSearchResponse | null
  isSymbolLoading: boolean
}

export const ChartSection = ({ searchResult, isSymbolLoading }: Props) => {
  const { exactMatch } = searchResult || {}
  const { history } = useSymbolHistory(exactMatch?.symbol, isSymbolLoading)

  return (
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
              <Card size="2" variant="surface" className={styles.chartCard}>
                <Chart data={history} />
              </Card>
            )}
          </Box>
        </AspectRatio>
      </section>
    </Flex>
  )
}
