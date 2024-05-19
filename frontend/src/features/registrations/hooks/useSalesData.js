'use client'
import { showSales } from '@/features/reservations/api/showSales'
import { useEffect, useState } from 'react'
import { auth } from '@/lib/FirebaseConfig'

export const useSalesData = (google_calendar_id) => {
  const [salesData, setSalesData] = useState(null)

  useEffect(() => {
    const getSales = async () => {
      try {
        const idToken = await auth.currentUser.getIdToken()
        const data = await showSales(google_calendar_id, idToken)
        console.log(data)
        setSalesData(data)
      } catch (error) {
        console.error('Error fetching sales data:', error)
      }
    }

    if (google_calendar_id !== undefined) {
      getSales()
    }
  }, [google_calendar_id])

  return salesData
}
