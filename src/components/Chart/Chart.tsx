import { HistoryResponse } from '@/types/HistoryResponse'
import { useMemo } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { DateTime } from 'luxon'
import { Badge } from '@radix-ui/themes'

interface Props {
  data: HistoryResponse
}

export const Chart = ({ data }: Props) => {
  const chartInput = useMemo(
    () => [
      {
        id: 'history',
        data: data.map((datum) => ({
          x: DateTime.fromMillis(datum.timestamp).toLocaleString({
            month: 'short',
            day: 'numeric',
          }),
          y: datum.quotes.close,
        })),
      },
    ],
    [data]
  )

  return (
    <ResponsiveLine
      data={chartInput}
      tooltip={(props) => (
        <>
          <Badge>
            <>{props.point.data.y}</>
          </Badge>
        </>
      )}
      margin={{ top: 20, right: 30, bottom: 50, left: 55 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 20,
        tickRotation: 0,
      }}
      axisLeft={{
        tickSize: 0,
        tickPadding: 15,
        tickRotation: 0,
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabelYOffset={-12}
      useMesh={true}
    />
  )
}
