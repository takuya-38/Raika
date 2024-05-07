import { useMemo } from 'react'
import dayjs from 'dayjs'

export const useDayList = (currentDate, weekStartDayOffset) => {
  const dayList = useMemo(() => {
    const _day = currentDate.day()
    return Array(7)
      .fill(0)
      .map((_, idx) => {
        const dayFormat = dayjs(
          currentDate.date(
            currentDate.date() - _day + weekStartDayOffset + idx,
          ),
        )
        return dayFormat.format('YYYY-MM-DD')
      })
  }, [currentDate, weekStartDayOffset])

  return dayList
}
