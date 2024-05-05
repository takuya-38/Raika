import { React, FormEventHandler } from 'react'
import styles from '@/features/registrations/components/Registrations/Registrations.module.css'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { reservationDataAtom } from '@/app/components/store/reservationData'
import { eventsAtom } from '@/app/components/store/events'

const Registrations = () => {
  const reservationData = useRecoilValue(reservationDataAtom)
  const setEvents = useSetRecoilState(eventsAtom)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const summary = form.get('summary') || ''
    const date = form.get('date') || ''
    const start_time = form.get('start_time') || ''
    const end_time = form.get('end_time') || ''
    const description = form.get('description') || ''

    const formDataObject = {
      summary: summary,
      description: description,
      start: `${date}T${start_time}:00+09:00`,
      end_: `${date}T${end_time}:00+09:00`,
    }

    createEvent(formDataObject)
  }

  const createEvent = async (eventData) => {
    try {
      const res = await fetch('http://localhost:3001/google_calendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })

      // const events = await fetchEvents()
      // setEvents(events)

      alert('作成完了')
      // console.log(JSON.stringify(eventData))
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:3001/google_calendar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await res.json()
      return data
    } catch (error) {
      console.error('Error fetching events:', error)
      return []
    }
  }

  return (
    <div className={styles.registrationsWrapper}>
      <div className={styles.reservationWrapper}>
        <p>予約</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <label className={styles.inputLabel} htmlFor="summary">
              タイトル
            </label>
            <input
              className={styles.inputText}
              type="text"
              name="summary"
              defaultValue={reservationData?.summary}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="date">日時</label>
            <input
              type="text"
              name="date"
              defaultValue={reservationData?.date}
            />
            <p> - </p>
            <input
              type="text"
              name="start_time"
              defaultValue={reservationData?.start_time}
            />
            <p> - </p>
            <input
              type="text"
              name="end_time"
              defaultValue={reservationData?.end_time}
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="description">メモ</label>
            <textarea
              name="description"
              defaultValue={reservationData?.description}
            />
          </div>
          <input type="submit" value="予約登録" />
        </form>
      </div>
      <div className={styles.salesWrapper}></div>
    </div>
  )
}

export default Registrations
