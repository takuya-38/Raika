import React from 'react'
import styles from './style.module.css'
import { WeeklyCalendar } from '@/features/reservations/components/WeeklyCalendar/WeeklyCalendar'

const page = () => {
  return (
    <div className={styles.app}>
      <WeeklyCalendar />
    </div>
  )
}

export default page
