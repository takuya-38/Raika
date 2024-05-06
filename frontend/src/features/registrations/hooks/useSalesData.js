'use client'
import { showSales } from '@/features/reservations/api/showSales'
import { useEffect, useState } from 'react'

export const useSalesData = (google_calendar_id) => {
  const [salesData, setSalesData] = useState(null)

  useEffect(() => {
    showSales(google_calendar_id)
      .then((data) => {
        setSalesData(data)
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error)
      })
  }, [google_calendar_id])

  return salesData
}
