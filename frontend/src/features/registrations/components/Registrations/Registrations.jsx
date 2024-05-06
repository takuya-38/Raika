import { useRecoilValue, useSetRecoilState } from 'recoil'
import { eventsAtom } from '@/app/components/store/events'
import { reservationDataAtom } from '@/app/components/store/reservationData'
import { fetchEvents } from '@/features/reservations/api/fetchEvents'
import { createEvent } from '@/features/reservations/api/createEvent'
import { updateEvent } from '@/features/reservations/api/updateEvent'
import styles from '@/features/registrations/components/Registrations/Registrations.module.css'
import { deleteEvent } from '@/features/reservations/api/deleteEvent'
import RadioBtn from '@/features/registrations/components/RadioBtn/RadioBtn'
import SelectBox from '@/features/registrations/components/SelectBox/SelectBox'
import {
  AGE_LIST,
  GENDER_LIST,
  MENU_LIST,
} from '@/features/registrations/constants/formItem'
import { createSales } from '@/features/reservations/api/createSales'
import { useSalesData } from '@/features/registrations/hooks/useSalesData'

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
  const setEvents = useSetRecoilState(eventsAtom)

  const salesData = useSalesData(reservationData.id)

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

  const handleSalesSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const getField = (name) => formData.get(name) || ''

    const age_group = AGE_LIST.find((item) => item.category == getField('age'))
    const gender = GENDER_LIST.find(
      (item) => item.category == getField('gender'),
    )

    const menu0 = MENU_LIST.find(
      (item) => item.name == getField('menus_0[name]'),
    )
    const menu1 = MENU_LIST.find(
      (item) => item.name == getField('menus_1[name]'),
    )
    const menu2 = MENU_LIST.find(
      (item) => item.name == getField('menus_2[name]'),
    )

    const formDataObject = {
      sale: {
        age_group_id: age_group.id,
        google_calendar_id: reservationData.id,
        gender: gender.id,
        menus: [
          {
            id: menu0.id,
            price: getField('price_menus_0'),
          },
          {
            id: menu1.id,
            price: getField('price_menus_1'),
          },
          {
            id: menu2.id,
            price: getField('price_menus_2'),
          },
        ],
      },
    }

    createSales(formDataObject)
    console.log(formDataObject)
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

  const renderSelectBoxes = () => {
    const emptyMenus = Array(3).fill({
      menu_id: 0,
      name: '-----------',
    })

    const selectedMenus = salesData?.selected_menus || []
    const mergedMenus = [...selectedMenus, ...emptyMenus].slice(0, 3)

    return mergedMenus.map((selectedMenu, index) => (
      <SelectBox
        key={index}
        itemCategory={`menus_${index}`}
        selectedData={selectedMenu}
      />
    ))
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
          <input type="submit" value="予約登録" />
        </form>
      </div>
      <div className={styles.salesWrapper}>
        <p>予約</p>
        <form onSubmit={handleSalesSubmit}>
          <RadioBtn
            itemCategory="gender"
            itemNames={['男性', '女性']}
            selectedData={
              GENDER_LIST.find((item) => item.id == salesData?.gender)?.category
            }
          />
          <RadioBtn
            itemCategory="age"
            itemNames={[
              '10歳未満',
              '10代',
              '20代',
              '30代',
              '40代',
              '50代',
              '60歳以上',
            ]}
            selectedData={
              AGE_LIST.find((item) => item.id == salesData?.age_group_id)
                ?.category
            }
          />
          {renderSelectBoxes()}
          <input type="submit" value="売上登録" />
        </form>
      </div>
    </div>
  )
}

export default Registrations
