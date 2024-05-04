import React, { useState } from 'react'
import styles from '../Reservations/Reservations.module.css'
import { HOUR_LIST } from '../../constants/time'

const EmptyCell = ({ date }) => {
  const [selectedRange, setSelectedRange] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  // ドラッグ開始のハンドラ
  const handleDragStart = (time) => {
    setSelectedRange({ start: time, end: time })
    setIsDragging(true)
  }

  // ドラッグ中のハンドラ
  const handleDragEnter = (time) => {
    if (isDragging) {
      setSelectedRange((prevRange) => ({
        ...prevRange,
        end: time,
      }))
    }
  }

  // ドラッグ終了のハンドラ
  const handleDragEnd = () => {
    setIsDragging(false)
    console.log(selectedRange)
    console.log(date)
  }

  // 選択された範囲内にあるかどうかを判定する関数
  const isSelected = (time) => {
    if (!selectedRange) return false
    const { start, end } = selectedRange
    return time >= start && time <= end
  }

  return (
    <>
      {HOUR_LIST.map((hourList) => (
        <div
          key={hourList.time}
          onMouseDown={() => handleDragStart(hourList.time)}
          onMouseEnter={() => handleDragEnter(hourList.time)}
          onMouseUp={handleDragEnd}
          className={`${styles.empty} ${isSelected(hourList.time) && isDragging ? styles.selected : ''}`}
        />
      ))}
    </>
  )
}

export default EmptyCell
