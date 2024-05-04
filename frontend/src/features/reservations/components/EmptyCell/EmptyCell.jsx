import { useCallback, useState } from 'react'
import { HOUR_LIST } from '@/features/reservations/constants/time'
import { useSetRecoilState } from 'recoil'
import { reservationDataAtom } from '@/app/components/store/reservationData'
import styles from '@/features/reservations/components/Reservations/Reservations.module.css'

const EmptyCell = ({ date }) => {
  const [selectedRange, setSelectedRange] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const setReservationData = useSetRecoilState(reservationDataAtom)

  const handleDragStart = useCallback((time) => {
    setSelectedRange({ start: time, end: time })
    setIsDragging(true)
  }, [])

  const handleDragEnter = useCallback(
    (time) => {
      if (isDragging) {
        setSelectedRange((prevRange) => ({
          ...prevRange,
          end: time,
        }))
      }
    },
    [isDragging],
  )

  const handleDragEnd = useCallback(() => {
    if (selectedRange) {
      setReservationData((prevData) => ({
        ...prevData,
        date: date,
        start_time: selectedRange.start,
        end_time: selectedRange.end,
      }))
      setIsDragging(false)
      console.log(selectedRange)
      console.log(date)
    }
  }, [selectedRange, date, setReservationData])

  const isSelected = useCallback(
    (time) => {
      return (
        isDragging &&
        selectedRange &&
        time >= selectedRange.start &&
        time <= selectedRange.end
      )
    },
    [isDragging, selectedRange],
  )

  return (
    <>
      {HOUR_LIST.map((hourList) => (
        <div
          key={hourList.time}
          onMouseDown={() => handleDragStart(hourList.time)}
          onMouseEnter={() => handleDragEnter(hourList.time)}
          onMouseUp={handleDragEnd}
          className={`${styles.empty} ${isSelected(hourList.time) ? styles.selected : ''}`}
        />
      ))}
    </>
  )
}

export default EmptyCell
