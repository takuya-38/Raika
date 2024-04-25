'use client'
import dayjs from 'dayjs'
import styles from './Reservations.module.css'
import { TIME_LIST, HOUR_LIST, WEEKDAYS_LIST } from '../../constants/time'

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

  const EmptyCell = (date) => {
    return (
      <>
        {HOUR_LIST.map((hourList, index) => {
          return (
            <div
              key={hourList.hour}
              onClick={() => {
                console.log(date.date, `${hourList.time}`)
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
      <div className={styles.calendarDate}>
        {dayList.map((dayItem, index) => {
          return (
            <div
              key={`weekdays-${dayItem.date}`}
              style={{ gridColumn: index + 1 }}
            >
              {WEEKDAYS_LIST[index]} {dayItem.split('-')[2]}
            </div>
          )
        })}
      </div>
      <div className={styles.calendarMain}>
        <div className={styles.timeslotsWrapper}>
          <ul className={styles.timeslotList}>
            {TIME_LIST.map((timeItem) => {
              return (
                <li
                  key={`timeslot-${timeItem.id}`}
                  className={styles.timeslotItem}
                >
                  {timeItem.time}
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.calendarWrapper}>
          <div className={styles.horizontalHeightContainer}>
            {TIME_LIST.map((timeItem) => (
              <div key={`horizontal-${timeItem.id}`}>
                <div className={styles.horizontalHeight} />
              </div>
            ))}
          </div>
          <div className={styles.eventContainer}>
            {dayList.map((dayItem, index) => {
              return (
                <div
                  key={`calendarColumn-${dayItem.date}`}
                  style={{ gridColumn: index + 1 }}
                  className={styles.calendarColumn}
                >
                  <EmptyCell date={dayItem} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
