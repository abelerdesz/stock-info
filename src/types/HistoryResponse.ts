export interface HistoryDatum {
  timestamp: number
  quotes: {
    open: number
    close: number
    high: number
    low: number
  }
}

export type HistoryResponse = HistoryDatum[]
