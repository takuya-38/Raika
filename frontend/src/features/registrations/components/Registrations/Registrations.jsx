import Image from 'next/image'
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
import { useSnackbarContext } from '@/app/components/layouts/SnackbarProvider/SnackbarProvider'

const InputField = ({ label, icon, type = 'text', name, defaultValue }) => (
  <div className={styles.inputBox}>
    <label className={styles.inputLabel} htmlFor={name}>
      <Image src={icon} alt={label} width={24} height={24} />
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
  const { showSnackbar } = useSnackbarContext()
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

      if (showSnackbar) {
        showSnackbar('success', '予約情報の登録完了しました。')
      }
    } catch (error) {
      console.error('Error processing registration:', error)

      if (showSnackbar) {
        showSnackbar('error', error.message)
      }
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

    const menus = [
      {
        id: menu0.id,
        price: getField('price_menus_0'),
      },
    ]

    if (menu1) {
      menus.push({
        id: menu1.id,
        price: getField('price_menus_1'),
      })
    }

    if (menu2) {
      menus.push({
        id: menu2.id,
        price: getField('price_menus_2'),
      })
    }

    const formDataObject = {
      sale: {
        age_group_id: age_group.id,
        google_calendar_id: reservationData.id,
        gender: gender.id,
        menus: menus,
      },
    }

    try {
      createSales(formDataObject)
      console.log(formDataObject)

      if (showSnackbar) {
        showSnackbar('success', '売上情報の登録完了しました。')
      }
    } catch (error) {
      console.error('Error processing registration:', error)

      if (showSnackbar) {
        showSnackbar('error', error.message)
      }
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

  console.log(reservationData)

  return (
    <div className={styles.registrationsWrapper}>
      <div className={styles.reservationWrapper}>
        <p className={styles.categoryName}>予約</p>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputBox}>
            <label className={styles.inputLabel} htmlFor={'summary'}>
              <Image
                src={'/icons/title.svg'}
                alt={'タイトル'}
                width={24}
                height={24}
              />
            </label>
            <input
              className={`${styles.inputText} ${styles.input}`} // クラス名を追加
              type={'text'}
              name={'summary'}
              defaultValue={reservationData ? reservationData.summary : ''}
              placeholder="タイトル"
            />
          </div>
          <div className={styles.inputBox}>
            <label className={styles.inputLabel} htmlFor={'date'}>
              <Image
                src={'/icons/clock.svg'}
                alt={'時間'}
                width={24}
                height={24}
              />
            </label>
            <input
              className={`${styles.inputDate} ${styles.input}`} // クラス名を追加
              type={'text'}
              name={'date'}
              defaultValue={reservationData ? reservationData.date : ''}
              placeholder="日付"
            />
            <div> </div>
            <input
              className={`${styles.inputTime} ${styles.input}`} // クラス名を追加
              type={'text'}
              name={'start_time'}
              defaultValue={reservationData ? reservationData.start_time : ''}
              placeholder="00:00"
            />
            <Image
              src="/icons/arrowRight.svg"
              alt="arrowRight"
              width={24}
              height={24}
            />
            <input
              className={`${styles.inputTime} ${styles.input}`} // クラス名を追加
              type={'text'}
              name={'end_time'}
              defaultValue={reservationData ? reservationData.end_time : ''}
              placeholder="00:00"
            />
          </div>
          <div className={styles.inputBox}>
            <label className={styles.inputLabel} htmlFor="description">
              <Image src="/icons/memo.svg" alt="memo" width={24} height={24} />
            </label>
            <textarea
              name="description"
              defaultValue={reservationData ? reservationData.description : ''}
              className={`${styles.textarea} ${styles.input}`}
              placeholder="メモ"
            />
          </div>
          <div className={styles.btnBox}>
            <input
              className={`${styles.btn} ${styles.registrationBtn} `}
              type="submit"
              value="登録"
            />
            <div
              className={`${styles.btn} ${styles.deleteBtn} `}
              onClick={handleDeleteClick}
            >
              削除
            </div>
          </div>
        </form>
      </div>
      <div className={styles.salesWrapper}>
        <p className={styles.categoryName}>売上</p>
        <form onSubmit={handleSalesSubmit}>
          <RadioBtn
            itemCategory="gender"
            src="/icons/gender.svg"
            itemNames={['男性', '女性']}
            selectedData={
              GENDER_LIST.find((item) => item.id == salesData?.gender)?.category
            }
          />
          <RadioBtn
            itemCategory="age"
            src="/icons/cake.svg"
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
          <p className={styles.subCategoryName}>メニュー</p>
          {renderSelectBoxes()}
          <div className={styles.btnBox}>
            <input
              className={`${styles.btn} ${styles.registrationBtn} `}
              type="submit"
              value="登録"
            />
            <div
              className={`${styles.btn} ${styles.deleteBtn} `}
              onClick={handleDeleteClick}
            >
              削除
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registrations
