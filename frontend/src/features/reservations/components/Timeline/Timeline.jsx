'use client'
import { TIME_LIST, HOUR_LIST } from '../../constants/time'
import styles from './Timeline.module.css'

export const Timeline = ({ dayList }) => {
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
    <div className={styles.timeslotsContainer}>
      <div className={styles.timeslotBox}>
        <ul className={styles.timeslotList}>
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
                    {dayItem.split('-')[1]}-{dayItem.split('-')[2]}
                  </div>
                  <EmptyCell date={dayItem.date} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
