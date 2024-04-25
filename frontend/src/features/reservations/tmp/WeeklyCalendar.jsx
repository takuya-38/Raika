'use client'
import dayjs from 'dayjs'
import { Timeline } from '@/features/reservations/components/Timeline/Timeline'
import styles from './WeeklyCalendar.module.css'
import { TIME_LIST, HOUR_LIST, WEEKDAYS_LIST } from '../../constants/time'

export const WeeklyCalendar = () => {
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

  const EmptyCell = (date) => {
    return (
      <>
        {HOUR_LIST.map((hourList, index) => {
          return (
            <div
              key={hourList.hour}
              onClick={() => {
                console.log(date, `${hourList.hour}時`)
              }}
              className={styles.empty}
            />
          )
        })}
      </>
    )
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <p>2024 4月</p>
      </div>
      <div className={styles.timeslotsContainer}>
        <div className={styles.timeslotBox}>
          <ul className={styles.timeslotList}>
            <li className={styles.timeslotsSpace}></li>
            {TIME_LIST.map((timeItem) => {
              const splitedHour = Number(timeItem.time.split(':')[0])
              const time = `${splitedHour}:${timeItem.time.split(':')[1]}`
              return (
                <li key={timeItem.id} className={styles.timeslotItem}>
                  {time}
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.calendarContainer}>
          <div className={styles.calendarWrapper}>
            <div>
              {TIME_LIST.map((timeItem) => (
                <div key={timeItem.id}>
                  <div className={styles.horizontalHeight} />
                </div>
              ))}
            </div>
            <div className={styles.eventContainer}>
              {dayList.map((dayItem, index) => {
                return (
                  <div
                    key={dayItem.date}
                    style={{ gridColumn: index + 1 }}
                    className={styles.calendarColumn}
                  >
                    <div className={styles.date}>
                      {WEEKDAYS_LIST[index]} {dayItem.split('-')[2]}
                    </div>
                    <EmptyCell date={dayItem.date} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
