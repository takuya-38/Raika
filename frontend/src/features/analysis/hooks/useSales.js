'use client'
import { fetchSales } from '@/features/analysis/api/fetchSales'
import { useSetRecoilState } from 'recoil'
import { useEffect } from 'react'
import { salesAtom } from '@/app/components/store/sales'

export const useSalesAllData = () => {
  const setSales = useSetRecoilState(salesAtom)

  useEffect(() => {
    const getSales = async () => {
      try {
        const data = await fetchSales()
        setSales(data)
      } catch (error) {
        console.error('Error fetching Sales:', error)
      }
    }
    getSales()
  }, [])
}
