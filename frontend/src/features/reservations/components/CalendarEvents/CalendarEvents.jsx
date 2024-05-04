'use client'
import { useRecoilValue } from 'recoil'
import { eventsAtom } from '@/app/components/store/events'
import { useEventsData } from '@/features/reservations/hooks/useEventsData'
import EmptyCell from '@/features/reservations/components/EmptyCell/EmptyCell'
import styles from '@/features/reservations/components/Reservations/Reservations.module.css'

const CalendarEvents = ({ dayList }) => {
  const events = useRecoilValue(eventsAtom)
  useEventsData()

  const calculateEventPosition = (event) => {
    const startMinutes = getMinutesFromTimeString(event.start_time)
    const endMinutes = getMinutesFromTimeString(event.end_time)
    const top = (startMinutes / 15) * 15
    const height = ((endMinutes - startMinutes) / 15) * 15

    return {
      top,
      height,
    }
  }

  const renderEvent = (event) => {
    const { top, height } = calculateEventPosition(event)

    return (
      <div
        key={`event_${event.id}`}
        className={styles.eventBox}
        style={{ top, height }}
      >
        <h1>{event.summary}</h1>
        <p>
          {event.start_time}-{event.end_time}
        </p>
      </div>
    )
  }

  const getMinutesFromTimeString = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number)
    return hours * 60 + minutes
  }

  return (
    <div className={styles.eventContainer}>
      {dayList.map((date, index) => (
        <div
          key={`calendarColumn-${date}`}
          className={styles.calendarColumn}
          style={{ gridColumn: index + 1 }}
        >
          <EmptyCell date={date} />
          {events.filter((event) => event.start_date === date).map(renderEvent)}
        </div>
      ))}
    </div>
  )
}

export default CalendarEvents
