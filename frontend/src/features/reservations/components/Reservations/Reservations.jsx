'use client'
import dayjs from 'dayjs'
import styles from './Reservations.module.css'
import { TIME_LIST } from '../../constants/time'
import CalendarHeader from '@/features/reservations/components/CalendarHeader/CalendarHeader'
import CalendarDate from '@/features/reservations/components/CalendarDate/CalendarDate'
import TimeSlots from '@/features/reservations/components/TimeSlots/TimeSlots'
import CalendarEvents from '@/features/reservations/components/CalendarEvents/CalendarEvents'

export const Reservations = () => {
  const weekStartDayOffset = 0
  const _date = dayjs()
  const _day = _date.day()
  const dayList = Array(7)
    .fill(0)
    .map((_, idx) => {
      const day = weekStartDayOffset + idx
      const dayFormat = dayjs(
        _date.date(_date.date() - _day + weekStartDayOffset + idx),
      )
      return dayFormat.format('YYYY-MM-DD')
    })

  return (
    <div className={styles.calendarContainer}>
      <CalendarHeader />
      <CalendarDate dayList={dayList} />
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
  )
}
