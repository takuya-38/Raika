import React from 'react'
import styles from '../Reservations/Reservations.module.css'
import { WEEKDAYS_LIST } from '../../constants/time'

const CalendarDate = ({ dayList }) => {
  return (
    <div className={styles.calendarDate}>
      {dayList.map((dayItem, index) => (
        <div key={`weekdays-${dayItem}`} style={{ gridColumn: index + 1 }}>
          {WEEKDAYS_LIST[index]} {dayItem.split('-')[2]}
        </div>
      ))}
    </div>
  )
}

export default CalendarDate
