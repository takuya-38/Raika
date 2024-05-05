import { useRecoilValue, useSetRecoilState } from 'recoil'
import { eventsAtom } from '@/app/components/store/events'
import { reservationDataAtom } from '@/app/components/store/reservationData'
import { fetchEvents } from '@/features/reservations/api/fetchEvents'
import { createEvent } from '@/features/reservations/api/createEvent'
import { updateEvent } from '@/features/reservations/api/updateEvent'
import styles from '@/features/registrations/components/Registrations/Registrations.module.css'
import { deleteEvent } from '@/features/reservations/api/deleteEvent'
import { menusAtom } from '@/app/components/store/menus'

const InputField = ({ label, type = 'text', name, defaultValue }) => (
  <div className={styles.inputBox}>
    <label className={styles.inputLabel} htmlFor={name}>
      {label}
    </label>
    <input
      className={styles.inputText}
      type={type}
      name={name}
      defaultValue={defaultValue}
    />
  </div>
)

const Registrations = () => {
  const reservationData = useRecoilValue(reservationDataAtom)
  const menus = useRecoilValue(menusAtom)
  console.log(menus)
  const setEvents = useSetRecoilState(eventsAtom)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const getField = (name) => formData.get(name) || ''
    const date = getField('date')
    const formDataObject = {
      summary: getField('summary'),
      description: getField('description'),
      start: `${date}T${getField('start_time')}:00+09:00`,
      end_: `${date}T${getField('end_time')}:00+09:00`,
    }

    const action = reservationData.id ? updateEvent : createEvent

    try {
      await action(formDataObject, reservationData.id)
      const events = await fetchEvents()
      setEvents(events)
    } catch (error) {
      console.error('Error processing registration:', error)
    }
  }

  const handleDeleteClick = async () => {
    try {
      await deleteEvent(reservationData.id)
      const events = await fetchEvents()
      setEvents(events)
    } catch (error) {
      console.error('Error processing registration:', error)
    }
  }

  return (
    <div className={styles.registrationsWrapper}>
      <div className={styles.reservationWrapper}>
        <p>予約</p>
        <form onSubmit={handleSubmit}>
          <InputField
            label="タイトル"
            name="summary"
            defaultValue={reservationData?.summary}
          />
          <InputField
            label="日時"
            name="date"
            defaultValue={reservationData?.date}
          />
          <p> - </p>
          <InputField
            name="start_time"
            defaultValue={reservationData?.start_time}
          />
          <p> - </p>
          <InputField
            name="end_time"
            defaultValue={reservationData?.end_time}
          />
          <div className={styles.inputBox}>
            <label htmlFor="description">メモ</label>
            <textarea
              name="description"
              defaultValue={reservationData?.description}
            />
          </div>
          <div className={styles.btn} onClick={handleDeleteClick}>
            削除
          </div>
          <input type="submit" value="登録" />
        </form>
      </div>
      <div className={styles.salesWrapper}>
        {menus.map((menu) => (
          <div>{menu.name}</div>
        ))}
      </div>
    </div>
  )
}

export default Registrations
