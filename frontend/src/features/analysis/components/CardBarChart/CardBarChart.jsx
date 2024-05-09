'use client'
import { BarChart, CodeBlock } from '@tremor/react'
import { useState } from 'react'
import styles from './CardBarChart.module.css'
import { useRecoilValue } from 'recoil'
import { salesAtom } from '@/app/components/store/sales'

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

const CardBarChart = (data) => {
  const [value, setValue] = useState(null)
  const salesData = useRecoilValue(salesAtom)

  const filteredData =
    data.dataName == '来店人数'
      ? salesData.map((yearData) => ({
          year: yearData.year,
          data: yearData.data.map((monthData) => ({
            date: monthData.date,
            来店人数: monthData['来店人数'],
          })),
        }))
      : salesData.map((yearData) => ({
          year: yearData.year,
          data: yearData.data.map((monthData) => ({
            date: monthData.date,
            総売上: monthData['総売上'],
          })),
        }))

  console.log(filteredData[0]?.data)

  return (
    <div className={styles.graphContent}>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
        {filteredData[0]?.year}年 {data.dataName}
      </h3>
      <BarChart
        className="mt-6"
        data={filteredData[0]?.data}
        index="date"
        categories={[data.dataName]}
        colors={['blue']}
        yAxisWidth={30}
        onValueChange={(v) => setValue(v)}
      />
    </div>
  )
}

export default CardBarChart
