import React from 'react'
import styles from '../Reservations/Reservations.module.css'
import EmptyCell from '@/features/reservations/components/EmptyCell/EmptyCell'

const CalendarEvents = ({ dayList, events }) => {
  const calculateEventPosition = (startTime, endTime) => {
    const startMinutes = getMinutesFromTimeString(startTime)
    const endMinutes = getMinutesFromTimeString(endTime)
    const top = (startMinutes / 15) * 15
    const height = ((endMinutes - startMinutes) / 15) * 15

    return {
      top,
      height,
    }
  }

  const getMinutesFromTimeString = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours * 60 + minutes
  }

  return (
    <div className={styles.eventContainer}>
      {dayList.map((dayItem, index) => (
        <div
          key={`calendarColumn-${dayItem}`}
          style={{ gridColumn: index + 1 }}
          className={styles.calendarColumn}
        >
          <EmptyCell date={dayItem} />

          {events
            .filter((event) => event.start_date === dayItem)
            .map((event) => {
              const { top, height } = calculateEventPosition(
                event.start_time,
                event.end_time,
              )

              return (
                <div
                  key={`event_${event.id}`}
                  style={{ top, height }}
                  className={styles.eventBox}
                >
                  {event.summary}
                </div>
              )
            })}
        </div>
      ))}
    </div>
  )
}

export default CalendarEvents
