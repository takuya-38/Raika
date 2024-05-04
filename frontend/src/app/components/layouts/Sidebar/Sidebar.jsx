'use client'
import { useState } from 'react'
import styles from './Sidebar.module.css'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { eventsAtom } from '@/app/components/store/events'
import dayjs from 'dayjs'

const Sidebar = () => {
  const events = useRecoilValue(eventsAtom)
  const today = dayjs().format('YYYY-MM-DD')

  const [isOpen, setIsOpen] = useState(true)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${styles.side} ${!isOpen && styles.sideClosed}`}>
      {/* <div className={styles.toggleContainer}>
        <Link className={styles.toggleBtn} href="#" onClick={toggleSidebar}>
          ■
        </Link>
      </div> */}

      <div className={styles.sideWrapper}>
        <div className={styles.serviceTitle}>Raika</div>
        <div className={styles.menuContainer}>
          <Link className={styles.menu} href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5zM5 8h14V6H5zm0 0V6zm7 6q-.425 0-.712-.288T11 13t.288-.712T12 12t.713.288T13 13t-.288.713T12 14m-4 0q-.425 0-.712-.288T7 13t.288-.712T8 12t.713.288T9 13t-.288.713T8 14m8 0q-.425 0-.712-.288T15 13t.288-.712T16 12t.713.288T17 13t-.288.713T16 14m-4 4q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m-4 0q-.425 0-.712-.288T7 17t.288-.712T8 16t.713.288T9 17t-.288.713T8 18m8 0q-.425 0-.712-.288T15 17t.288-.712T16 16t.713.288T17 17t-.288.713T16 18"
              ></path>
            </svg>
            <p className={styles.menuText}>スケジュール</p>
          </Link>
          <Link className={styles.menu} href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2 21v-2h20v2zm1-3v-7h3v7zm5 0V6h3v12zm5 0V9h3v9zm5 0V3h3v15z"
              ></path>
            </svg>
            <p className={styles.menuText}>売上分析</p>
          </Link>
          <Link className={styles.menu} href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7 9V7h14v2zm0 4v-2h14v2zm0 4v-2h14v2zM4 9q-.425 0-.712-.288T3 8t.288-.712T4 7t.713.288T5 8t-.288.713T4 9m0 4q-.425 0-.712-.288T3 12t.288-.712T4 11t.713.288T5 12t-.288.713T4 13m0 4q-.425 0-.712-.288T3 16t.288-.712T4 15t.713.288T5 16t-.288.713T4 17"
              ></path>
            </svg>
            <p className={styles.menuText}>メニュー設定</p>
          </Link>
        </div>

        <div className={styles.todayScheduleContainer}>
          <p>本日の予定</p>
          {events
            .filter((event) => event.start_date === today)
            .map((event) => {
              return (
                <div key={event.id} className={styles.eventItem}>
                  <div className={styles.eventIcon}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.2 0 .375.038t.35.112L17.875 5H5v14h14v-6.65l2-2V19q0 .825-.587 1.413T19 21zm6.525-4l-5.65-5.65l1.4-1.4l4.25 4.25L20.7 5.025L22.125 6.4z"
                      ></path>
                    </svg>
                  </div>
                  <div className={styles.eventText}>
                    <div>
                      {event.start_time}-{event.end_time}
                    </div>
                    <div>{event.summary}</div>
                  </div>
                </div>
              )
            })}
          {/* <div className={styles.eventItem}>
            <div className={styles.eventIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.2 0 .375.038t.35.112L17.875 5H5v14h14v-6.65l2-2V19q0 .825-.587 1.413T19 21zm6.525-4l-5.65-5.65l1.4-1.4l4.25 4.25L20.7 5.025L22.125 6.4z"
                ></path>
              </svg>
            </div>
            <div className={styles.eventText}>
              <div>09:00-10:00</div>
              <div>加藤さん</div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
