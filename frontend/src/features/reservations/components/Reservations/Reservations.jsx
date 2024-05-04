'use client'
import { useState } from 'react'
import dayjs from 'dayjs'
import { TIME_LIST } from '@/features/reservations/constants/time'
import { useDayList } from '@/features/reservations/hooks/useDayList'
import CalendarHeader from '@/features/reservations/components/CalendarHeader/CalendarHeader'
import TimeSlots from '@/features/reservations/components/TimeSlots/TimeSlots'
import CalendarEvents from '@/features/reservations/components/CalendarEvents/CalendarEvents'
import Registrations from '@/features/registrations/components/Registrations/Registrations'
import styles from '@/features/reservations/components/Reservations/Reservations.module.css'

const WEEK_START_DAY_OFFSET = 0

const handleNextWeekClick = (currentDate, setCurrentDate) => {
  setCurrentDate(currentDate.add(7, 'day'))
}

const handlePreviousWeekClick = (currentDate, setCurrentDate) => {
  setCurrentDate(currentDate.subtract(7, 'day'))
}

const handleTodayWeekClick = (setCurrentDate) => {
  setCurrentDate(dayjs())
}

export const Reservations = () => {
  const [currentDate, setCurrentDate] = useState(dayjs())
  const dayList = useDayList(currentDate, WEEK_START_DAY_OFFSET)

  return (
    <div className={styles.reservationsWrapper}>
      <div className={styles.calendarContainer}>
        <CalendarHeader
          currentDate={currentDate}
          dayList={dayList}
          onNextWeekClick={() =>
            handleNextWeekClick(currentDate, setCurrentDate)
          }
          onPreviousWeekClick={() =>
            handlePreviousWeekClick(currentDate, setCurrentDate)
          }
          onTodayWeekClick={() => handleTodayWeekClick(setCurrentDate)}
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
            <CalendarEvents dayList={dayList} />
          </div>
        </div>
      </div>
      <Registrations />
    </div>
  )
}
