import { useTabContext } from '@/app/components/provider/tabProvider'
import HomeTab from '@/features/analysis/components/HomeTab/HomeTab'
import YearTab from '@/features/analysis/components/YearTab/YearTab'
import AllTab from '@/features/analysis/components/AllTab/AllTab'
import { useDashboardData } from '@/features/analysis/hooks/useDashboard'
import styles from './Analysis.module.css'
import { useRecoilValue } from 'recoil'
import { dashboardDataAtom } from '@/app/components/store/dashboardData'

const Analysis = () => {
  useDashboardData()

  const { value } = useTabContext()

  const renderTabContent = (value) => {
    switch (value) {
      case '1':
        return <HomeTab />
      case '2':
        return <YearTab />
      case '3':
        return <AllTab />
    }
  }

  // if (dbData?.today_data?.title === undefined) {
  //   return <div></div>
  // }

  return <div className={styles.mainWrapper}>{renderTabContent(value)}</div>
  // return <div></div>
}

export default Analysis
