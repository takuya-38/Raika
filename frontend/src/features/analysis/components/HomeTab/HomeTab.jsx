import PieChartCard from '@/features/analysis/components/PieChartCard/PieChartCard'
import ValueDataCard from '@/features/analysis/components/ValueDataCard/ValueDataCard'
import LineChartCard from '@/features/analysis/components/LineChartCard/LineChartCard'
import styles from '@/features/analysis/components/HomeTab/HomeTab.module.css'

const HomeTab = () => {
  const cardData = [
    { title: 'Today', users: 8, money: 33000 },
    { title: 'This Week', users: 23, money: 140000 },
    { title: 'This Month', users: 108, money: 2000000 },
  ]

  const data = [
    { name: 'Page A', visits: 4000, sales: 2400 },
    { name: 'Page B', visits: 3000, sales: 1398 },
    { name: 'Page C', visits: 2000, sales: 9800 },
    { name: 'Page D', visits: 2780, sales: 3908 },
    { name: 'Page E', visits: 1890, sales: 4800 },
    { name: 'Page F', visits: 2390, sales: 3800 },
    { name: 'Page G', visits: 3490, sales: 4300 },
  ]

  const pie_data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]

  return (
    <div className={styles.container}>
      {cardData.map((data, index) => (
        <ValueDataCard
          key={index}
          data={data}
          className={styles[`valueData${index + 1}`]}
        />
      ))}
      <LineChartCard title="Weekly Chart" data={data} />
      <div className={styles.pieChartWrapper}>
        <PieChartCard
          title="Menu Ratio"
          className={styles.pieChartA}
          color="#84CDE4"
          data={pie_data}
        />
        <PieChartCard
          title="Gender Ratio"
          className={styles.pieChartB}
          color="#43B6C4"
          data={pie_data}
        />
        <PieChartCard
          title="Age Ratio"
          className={styles.pieChartC}
          color="#30A2CF"
          data={pie_data}
        />
      </div>
    </div>
  )
}

export default HomeTab
