import PieChartCard from '@/features/analysis/components/PieChartCard/PieChartCard'
import ValueDataCard from '@/features/analysis/components/ValueDataCard/ValueDataCard'
import styles from '@/features/analysis/components/HomeTab/HomeTab.module.css'
import BarChartCard from '@/features/analysis/components/BarChartCard/BarChartCard'

const YearTab = () => {
  const year_data = { title: 'This Year', users: 283, money: 12333000 }

  const pie_data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ]

  const bar_data = [
    { name: '月', visits: 4000 },
    { name: '火', visits: 3000 },
    { name: '水', visits: 2000 },
    { name: '木', visits: 2780 },
    { name: '金', visits: 1890 },
    { name: '土', visits: 2390 },
    { name: '日', visits: 3490 },
  ]

  const large_bar_data = [
    { name: '1月', sales: 1890 },
    { name: '2月', sales: 2780 },
    { name: '3月', sales: 2000 },
    { name: '4月', sales: 3000 },
    { name: '5月', sales: 4000 },
    { name: '6月', sales: 2390 },
    { name: '7月', sales: 3490 },
    { name: '8月', sales: 3200 },
    { name: '9月', sales: 4100 },
    { name: '10月', sales: 2950 },
    { name: '11月', sales: 4300 },
    { name: '12月', sales: 3600 },
  ]

  return (
    <div className={styles.container}>
      <ValueDataCard data={year_data} className={styles.valueData1} />
      <BarChartCard
        title="Visits by Day of the Week"
        data={bar_data}
        value_name="visits"
        className={styles.valueData23}
        color="#43B6C4"
      />
      <BarChartCard
        title="Visits by Day of the Week"
        data={large_bar_data}
        value_name="sales"
        className={styles.largeGrid}
        color="#FEAD73"
      />
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

export default YearTab
