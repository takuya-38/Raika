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
  const [currentDate, setCurrentDate] = useState(dayjs())
  const [dayList, setDayList] = useState([])

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
  )
}
