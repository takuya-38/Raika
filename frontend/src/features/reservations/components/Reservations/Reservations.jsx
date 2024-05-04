'use client'
import dayjs from 'dayjs'
import styles from './Reservations.module.css'
import { TIME_LIST } from '../../constants/time'
import CalendarHeader from '@/features/reservations/components/CalendarHeader/CalendarHeader'
import TimeSlots from '@/features/reservations/components/TimeSlots/TimeSlots'
import CalendarEvents from '@/features/reservations/components/CalendarEvents/CalendarEvents'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { eventsAtom } from '@/app/components/store/events'
import Registrations from '@/features/registrations/components/Registrations/Registrations'

export const Reservations = () => {
  const weekStartDayOffset = 0
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [dayList, setDayList] = useState([])
  const events = useRecoilValue(eventsAtom)

  useEffect(() => {
    const updateDayList = () => {
      const _day = currentDate.day()
      const newDayList = Array(7)
        .fill(0)
        .map((_, idx) => {
          const day = weekStartDayOffset + idx
          const dayFormat = dayjs(
            currentDate.date(
              currentDate.date() - _day + weekStartDayOffset + idx,
            ),
          )
          return dayFormat.format('YYYY-MM-DD')
        })
      setDayList(newDayList)
    }

    updateDayList()
  }, [currentDate])

  const handleNextWeekClick = () => {
    setCurrentDate(currentDate.add(7, 'day'))
  }

  const handlePreviousWeekClick = () => {
    setCurrentDate(currentDate.subtract(7, 'day'))
  }

  return (
    <div className={styles.reservationsWrapper}>
      <div className={styles.calendarContainer}>
        <CalendarHeader
          dayList={dayList}
          onNextWeekClick={handleNextWeekClick}
          onPreviousWeekClick={handlePreviousWeekClick}
        />
        <div className={styles.calendarMain}>
          <TimeSlots />
          <div className={styles.calendarWrapper}>
            <div className={styles.horizontalHeightContainer}>
              {TIME_LIST.map((timeItem) => (
                <div key={`horizontal-${timeItem.id}`}>
                  <div className={styles.horizontalHeight} />
                </div>
              ))}
            </div>
            <CalendarEvents dayList={dayList} events={events} />
          </div>
        </div>
      </div>
      <Registrations />
    </div>
  )
}
