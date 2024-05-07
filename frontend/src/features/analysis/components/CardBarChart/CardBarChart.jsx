'use client'
import { BarChart, CodeBlock } from '@tremor/react'
import { useState } from 'react'

// const chartdata = [
//   {
//     date: 'Jan 23',
//     2022: 45,
//     2023: 78,
//   },
//   {
//     date: 'Feb 23',
//     2022: 52,
//     2023: 71,
//   },
//   {
//     date: 'Mar 23',
//     2022: 48,
//     2023: 80,
//   },
//   {
//     date: 'Apr 23',
//     2022: 61,
//     2023: 65,
//   },
//   {
//     date: 'May 23',
//     2022: 55,
//     2023: 58,
//   },
//   {
//     date: 'Jun 23',
//     2022: 67,
//     2023: 62,
//   },
//   {
//     date: 'Jul 23',
//     2022: 60,
//     2023: 54,
//   },
//   {
//     date: 'Aug 23',
//     2022: 72,
//     2023: 49,
//   },
//   {
//     date: 'Sep 23',
//     2022: 65,
//     2023: 52,
//   },
//   {
//     date: 'Oct 23',
//     2022: 68,
//     2023: null,
//   },
//   {
//     date: 'Nov 23',
//     2022: 74,
//     2023: null,
//   },
//   {
//     date: 'Dec 23',
//     2022: 71,
//     2023: null,
//   },
// ]

const chartdata = [
  {
    name: 'Amphibians',
    'Number of threatened species': 2488,
  },
  {
    name: 'Birds',
    'Number of threatened species': 1445,
  },
  {
    name: 'Crustaceans',
    'Number of threatened species': 743,
  },
  {
    name: 'Ferns',
    'Number of threatened species': 281,
  },
  {
    name: 'Arachnids',
    'Number of threatened species': 251,
  },
  {
    name: 'Corals',
    'Number of threatened species': 232,
  },
  {
    name: 'Algae',
    'Number of threatened species': 98,
  },
]

const dataFormatter = (number) =>
  Intl.NumberFormat('us').format(number).toString()

const CardBarChart = () => {
  const [value, setValue] = useState(null)

  return (
    // <>
    //   <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
    //     Closed Pull Requests
    //   </h3>
    //   <BarChart
    //     className="mt-6"
    //     data={chartdata}
    //     index="date"
    //     categories={['2022', '2023']}
    //     colors={['gray', 'blue']}
    //     yAxisWidth={30}
    //     onValueChange={(v) => setValue(v)}
    //   />
    //   <CodeBlock
    //     source={JSON.stringify(value, null, 2)}
    //     variant="empty"
    //     className="mt-8"
    //   />
    // </>
    <BarChart
      data={chartdata}
      index="name"
      categories={['Number of threatened species']}
      colors={['blue']}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
      onValueChange={(v) => console.log(v)}
    />
  )
}

export default CardBarChart
