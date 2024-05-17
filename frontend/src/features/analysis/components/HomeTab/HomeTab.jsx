import PieChartCard from '@/features/analysis/components/PieChartCard/PieChartCard'
import ValueDataCard from '@/features/analysis/components/ValueDataCard/ValueDataCard'
import LineChartCard from '@/features/analysis/components/LineChartCard/LineChartCard'
import styles from '@/features/analysis/components/HomeTab/HomeTab.module.css'
import { useRecoilValue } from 'recoil'
import { dashboardDataAtom } from '@/app/components/store/dashboardData'

const HomeTab = () => {
  const dbData = useRecoilValue(dashboardDataAtom)

  if (dbData.length == 0) {
    console.log('home')
    return <div></div>
  }

  return (
    <div className={styles.container}>
      {[dbData.today_data, dbData.this_week_data, dbData.this_month_data].map(
        (data, index) => (
          <ValueDataCard
            key={index}
            data={data}
            className={styles[`valueData${index + 1}`]}
          />
        ),
      )}
      <LineChartCard title="Weekly Chart" data={dbData.weekly_chart_data} />
      <div className={styles.pieChartWrapper}>
        <PieChartCard
          title="Menu Ratio"
          className={styles.pieChartA}
          color="#84CDE4"
          data={dbData.menu_ratio.this_month}
        />
        <PieChartCard
          title="Gender Ratio"
          className={styles.pieChartB}
          color="#43B6C4"
          data={dbData.gender_ratio.this_month}
        />
        <PieChartCard
          title="Age Ratio"
          className={styles.pieChartC}
          color="#30A2CF"
          data={dbData.age_ratio.this_month}
        />
      </div>
    </div>
  )
}

export default HomeTab
