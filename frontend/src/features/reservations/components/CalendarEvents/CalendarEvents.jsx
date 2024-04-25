import React from 'react'
import styles from '../Reservations/Reservations.module.css'
import EmptyCell from '@/features/reservations/components/EmptyCell/EmptyCell'

const CalendarEvents = ({ dayList }) => {
  return (
    <div className={styles.eventContainer}>
      {dayList.map((dayItem, index) => (
        <div
          key={`calendarColumn-${dayItem}`}
          style={{ gridColumn: index + 1 }}
          className={styles.calendarColumn}
        >
          <EmptyCell date={dayItem} />
        </div>
      ))}
    </div>
  )
}
export default CalendarEvents
