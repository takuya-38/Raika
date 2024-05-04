import Image from 'next/image'
import dayjs from 'dayjs'
import { WEEKDAYS_LIST } from '@/features/reservations/constants/time'
import styles from '@/features/reservations/components/Reservations/Reservations.module.css'

const renderHeaderNav = (icon, text, handleClick) => (
  <div className={styles.buttonIcon} onClick={handleClick}>
    <Image src={icon} alt={text} width={24} height={24} />
  </div>
)

const getYearAndMonth = (dateString) => {
  const date = dayjs(dateString)
  return {
    year: date.year(),
    month: date.month() + 1,
  }
}

const CalendarHeader = ({
  dayList,
  onNextWeekClick,
  onPreviousWeekClick,
  onTodayWeekClick,
}) => {
  const { year, month } = getYearAndMonth(dayList[0])

  return (
    <div className={styles.calendarHeader}>
      <div className={styles.calendarNav}>
        <div className={styles.headerDate}>
          {year} {month}月
        </div>
        {renderHeaderNav(
          '/icons/chevronLeft.svg',
          'chevronLeft',
          onPreviousWeekClick,
        )}
        {renderHeaderNav(
          '/icons/chevronRight.svg',
          'chevronRight',
          onNextWeekClick,
        )}
        {renderHeaderNav('/icons/turn.svg', 'turn', onTodayWeekClick)}
      </div>

      <div className={styles.calendarDate}>
        {dayList.map((dayItem, index) => (
          <div key={`weekdays-${dayItem}`} style={{ gridColumn: index + 1 }}>
            {WEEKDAYS_LIST[index]} {dayItem.split('-')[2]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarHeader
