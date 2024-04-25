import React from 'react'
import styles from '../Reservations/Reservations.module.css'
import { TIME_LIST } from '../../constants/time'

const TimeSlots = () => {
  return (
    <div className={styles.timeslotsWrapper}>
      <ul className={styles.timeslotList}>
        {TIME_LIST.map((timeItem) => (
          <li key={`timeslot-${timeItem.id}`} className={styles.timeslotItem}>
            {timeItem.time}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TimeSlots
