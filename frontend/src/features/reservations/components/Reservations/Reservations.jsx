'use client'
import dayjs from 'dayjs'
import styles from './Reservations.module.css'
import { TIME_LIST } from '../../constants/time'
import CalendarHeader from '@/features/reservations/components/CalendarHeader/CalendarHeader'
import CalendarDate from '@/features/reservations/components/CalendarDate/CalendarDate'
import TimeSlots from '@/features/reservations/components/TimeSlots/TimeSlots'
import CalendarEvents from '@/features/reservations/components/CalendarEvents/CalendarEvents'
import { useState, useEffect } from 'react'

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

  // 初期ロード
  const [events, setEvents] = useState([])
  useEffect(() => {
    const fetchTop = async () => {
      const res = await fetch('http://localhost:3001/google_calendar')
      const data = await res.json()
      setEvents(data)
    }

    fetchTop()
  }, [])

  return (
    <div className={styles.calendarContainer}>
      {/* イベント作成仮
      {posts.map((post) => {
        console.log(post)
        return <div>{post.start_date}</div>
      })} */}
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
          <CalendarEvents dayList={dayList} events={events} />
        </div>
      </div>
    </div>
  )
}
