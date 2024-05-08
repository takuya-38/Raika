'use client'
import { BarChart, CodeBlock } from '@tremor/react'
import { useState } from 'react'
import styles from './CardBarChart.module.css'

const chartdata = [
  {
    date: 'Jan 23',
    2023: 78,
  },
  {
    date: 'Feb 23',
    2023: 71,
  },
  {
    date: 'Mar 23',
    2023: 80,
  },
  {
    date: 'Apr 23',
    2023: 65,
  },
  {
    date: 'May 23',
    2023: 58,
  },
  {
    date: 'Jun 23',
    2023: 62,
  },
  {
    date: 'Jul 23',
    2023: 54,
  },
  {
    date: 'Aug 23',
    2023: 49,
  },
  {
    date: 'Sep 23',
    2023: 52,
  },
  {
    date: 'Oct 23',
    2023: null,
  },
  {
    date: 'Nov 23',
    2023: null,
  },
  {
    date: 'Dec 23',
    2023: null,
  },
]

const CardBarChart = () => {
  const [value, setValue] = useState(null)

  return (
    <div className={styles.graphContent}>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        Closed Pull Requests
      </h3>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="date"
        categories={['2022', '2023']}
        colors={['gray', 'blue']}
        yAxisWidth={30}
        onValueChange={(v) => setValue(v)}
      />
    </div>
  )
}

export default CardBarChart
