import React from 'react'
import styles from '../Reservations/Reservations.module.css'
import { WEEKDAYS_LIST } from '../../constants/time'

const CalendarHeader = ({ dayList, onNextWeekClick, onPreviousWeekClick }) => {
  if (dayList.length === 0) {
    return <div className={styles.calendarHeader}></div>
  }

  const year = dayList[0].split('-')[0]
  const month = dayList[0].split('-')[1]

  return (
    <div className={styles.calendarHeader}>
      <div className={styles.calendarNav}>
        <div className={styles.headerDate}>
          {year} {month}月
        </div>
        <div onClick={onPreviousWeekClick} className={styles.buttonIcon}>
          {'<'}
        </div>
        <div onClick={onNextWeekClick} className={styles.buttonIcon}>
          {'>'}
        </div>
      </div>

      <div className={styles.calendarDate}>
        {dayList.map((dayItem, index) => (
          <div key={`weekdays-${dayItem}`} style={{ gridColumn: index + 1 }}>
            {WEEKDAYS_LIST[index]} {dayItem.split('-')[2]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarHeader
