import { React, FormEventHandler } from 'react'
import styles from '@/features/registrations/components/Registrations/Registrations.module.css'

const handleSubmit = (event) => {
  event.preventDefault()
  const form = new FormData(event.currentTarget)
  const summary = form.get('summary') || ''
  const date = form.get('date') || ''
  const start_time = form.get('start_time') || ''
  const end_time = form.get('end_time') || ''
  const description = form.get('description') || ''
  // alert(
  //   `Summery: ${summary}\nDate: ${date}\nStartTime: ${start_time}\nEndTime: ${end_time}\nDescription: ${description}`,
  // )

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
    // const data = await res.json()
    alert('作成完了')
    // console.log(JSON.stringify(eventData))
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}

const Registrations = () => {
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
              defaultValue=""
            />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="date">日時</label>
            <input type="text" name="date" defaultValue="" />
            <p> - </p>
            <input type="text" name="start_time" defaultValue="" />
            <p> - </p>
            <input type="text" name="end_time" defaultValue="" />
          </div>

          <div className={styles.inputBox}>
            <label htmlFor="description">メモ</label>
            <textarea name="description" defaultValue="" />
          </div>
          <input type="submit" value="予約登録" />
        </form>
      </div>
      <div className={styles.salesWrapper}></div>
    </div>
  )
}

export default Registrations
