import dayjs from 'dayjs'
import { Timeline } from '@/features/reservations/components/Timeline/Timeline'

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

  return (
    <div className="calendarContainer">
      {/* <div>{dayList}</div> */}
      <Timeline dayList={dayList} />
    </div>
  )
}
