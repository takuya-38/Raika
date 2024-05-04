'use client'
import React, { useEffect } from 'react'
import styles from '../Reservations/Reservations.module.css'
import EmptyCell from '@/features/reservations/components/EmptyCell/EmptyCell'
import { useRecoilValue } from 'recoil'
import { eventsAtom } from '@/app/components/store/events'
import { useInitialData } from '@/app/components/hooks/useInitialData'

const CalendarEvents = ({ dayList }) => {
  const events = useRecoilValue(eventsAtom)
  useInitialData()

  useEffect(() => {
    // eventsAtomの変更を監視し、再レンダリングをトリガーする
    console.log('Events updated:', events)
  }, [events])

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
                  <h1>{event.summary}</h1>
                  <p>
                    {event.start_time}-{event.end_time}
                  </p>
                </div>
              )
            })}
        </div>
      ))}
    </div>
  )
}

export default CalendarEvents
