import styles from './style.module.css'
import CardBarChart from '@/features/analysis/components/CardBarChart/CardBarChart'

const Page = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.pageTitleWrapper}>売上分析</div>
        <div className={styles.analysisWrapper}>
          <div className={styles.dataContainer}>
            <div className={styles.dataContent}>
              <h1>今月</h1>
              <div className={styles.dataBox}>
                <div>売上</div>
                <div>￥ 50,000</div>
              </div>
              <div className={styles.dataBox}>
                <div>来店人数</div>
                <div>6 人</div>
              </div>
            </div>
            <div className={styles.dataContent}>
              <div className={styles.dataBox}>今週</div>
              <div className={styles.dataBox}>
                <div>売上</div>
                <div>￥ 50,000</div>
              </div>
              <div className={styles.dataBox}>
                <div>来店人数</div>
                <div>6 人</div>
              </div>
            </div>
            <div className={styles.dataContent}>
              <div className={styles.dataBox}>先週</div>
              <div className={styles.dataBox}>
                <div>売上</div>
                <div>￥ 50,000</div>
              </div>
              <div className={styles.dataBox}>
                <div>来店人数</div>
                <div>6 人</div>
              </div>
            </div>
          </div>

          <div className={styles.graphContainer}>
            <CardBarChart />
            <CardBarChart />
          </div>
        </div>
      </div>
      <div className={styles.deadSpace}></div>
    </div>
  )
}

export default Page
