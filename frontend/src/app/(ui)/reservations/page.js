import React from 'react'
import styles from './style.module.css'
import { Reservations } from '@/features/reservations/components/Reservations/Reservations'

const page = () => {
  return (
    <div className={styles.app}>
      <Reservations />
    </div>
  )
}

export default page
