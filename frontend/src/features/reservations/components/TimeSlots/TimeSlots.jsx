import { TIME_LIST } from '@/features/reservations/constants/time'
import styles from '../Reservations/Reservations.module.css'

const TimeSlots = () => {
  return (
    <div className={styles.timeslotsWrapper}>
      <ul className={styles.timeslotList}>
        {TIME_LIST.map((timeItem) => (
          <li key={`timeslot-${timeItem.id}`} className={styles.timeslotItem}>
            {timeItem.time}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TimeSlots
