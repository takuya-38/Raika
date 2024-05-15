'use client'
import { fetchSales } from '@/features/analysis/api/fetchSales'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import { salesAtom } from '@/app/components/store/sales'
import { auth } from '@/lib/FirebaseConfig'

export const useSalesAllData = () => {
  const setSales = useSetRecoilState(salesAtom)

  useEffect(() => {
    const getSales = async () => {
      try {
        const idToken = await auth.currentUser.getIdToken()
        console.log(idToken)
        const data = await fetchSales(idToken)
        setSales(data)
      } catch (error) {
        console.error('Error fetching Sales:', error)
      }
    }
    getSales()
  }, [])
}
