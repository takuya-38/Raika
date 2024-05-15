import styles from './Analysis.module.css'
import CardBarChart from '@/features/analysis/components/CardBarChart/CardBarChart'
import { useSalesAllData } from '@/features/analysis/hooks/useSales'

const Analysis = () => {
  useSalesAllData()

  return (
    <>
      <div className={styles.container}>
        <div className={styles.pageTitleWrapper}>売上分析</div>
        <div className={styles.analysisWrapper}>
          <div className={styles.graphContainer}>
            <CardBarChart dataName="総売上" />
            <CardBarChart dataName="来店人数" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Analysis
