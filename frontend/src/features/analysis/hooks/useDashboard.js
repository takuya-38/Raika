'use client'
import { fetchDashboardData } from '@/features/analysis/api/featchDashboardData'
import { auth } from '@/lib/FirebaseConfig'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import { dashboardDataAtom } from '@/app/components/store/dashboardData'

export const useDashboardData = () => {
  const setDashboardData = useSetRecoilState(dashboardDataAtom)

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        const idToken = await auth.currentUser.getIdToken()
        const data = await fetchDashboardData(idToken)
        setDashboardData(data)
      } catch (error) {
        console.error('Error fetching DashboardDate:', error)
      }
    }
    getDashboardData()
  }, [])
}
