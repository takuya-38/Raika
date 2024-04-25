import React from 'react'
import styles from '../Reservations/Reservations.module.css'
import { HOUR_LIST } from '../../constants/time'

const EmptyCell = ({ date }) => {
  return (
    <>
      {HOUR_LIST.map((hourList) => (
        <div
          key={hourList.hour}
          onClick={() => {
            console.log(date, `${hourList.time}`)
          }}
          className={styles.empty}
        />
      ))}
    </>
  )
}

export default EmptyCell
