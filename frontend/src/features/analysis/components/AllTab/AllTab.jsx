import PieChartCard from '@/features/analysis/components/PieChartCard/PieChartCard'
import ValueDataCard from '@/features/analysis/components/ValueDataCard/ValueDataCard'
import styles from '@/features/analysis/components/HomeTab/HomeTab.module.css'
import BarChartCard from '@/features/analysis/components/BarChartCard/BarChartCard'
import { useRecoilValue } from 'recoil'
import { dashboardDataAtom } from '@/app/components/store/dashboardData'

const AllTab = () => {
  const dbData = useRecoilValue(dashboardDataAtom)

  if (dbData.length == 0) {
    return <div></div>
  }

  return (
    <div className={styles.container}>
      <ValueDataCard
        data={dbData.all_time_data}
        className={styles.valueData1}
      />
      <BarChartCard
        title="Visits by Day of the Week"
        data={dbData.visits_by_day.all_time}
        value_name="visits"
        className={styles.valueData23}
        color="#43B6C4"
      />
      <BarChartCard
        title="Visits by Day of the Week"
        data={dbData.yearly_sales}
        value_name="sales"
        className={styles.largeGrid}
        color="#FEAD73"
      />
      <div className={styles.pieChartWrapper}>
        <PieChartCard
          title="Menu Ratio"
          className={styles.pieChartA}
          color="#84CDE4"
          data={dbData.menu_ratio.all_time}
        />
        <PieChartCard
          title="Gender Ratio"
          className={styles.pieChartB}
          color="#43B6C4"
          data={dbData.gender_ratio.all_time}
        />
        <PieChartCard
          title="Age Ratio"
          className={styles.pieChartC}
          color="#30A2CF"
          data={dbData.age_ratio.all_time}
        />
      </div>
    </div>
  )
}

export default AllTab
