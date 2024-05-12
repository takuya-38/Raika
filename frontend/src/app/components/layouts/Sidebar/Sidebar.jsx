'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import dayjs from 'dayjs'
import { useRecoilValue } from 'recoil'
import { eventsAtom } from '@/app/components/store/events'
import styles from './Sidebar.module.css'
import {
  CalendarIcon,
  AnalyticsIcon,
  MenuIcon,
  CheckIcon,
} from '@/public/icons/svgIcon'
import Image from 'next/image'
import logoImage from '@/public/logo/Raika_logo.png'

const renderEvent = (event) => (
  <div key={event.id} className={styles.eventItem}>
    <div className={styles.eventIcon}>
      <CheckIcon />
    </div>
    <div className={styles.eventText}>
      <div>
        {event.start_time}-{event.end_time}
      </div>
      <div>{event.summary}</div>
    </div>
  </div>
)

const Sidebar = () => {
  const events = useRecoilValue(eventsAtom)
  const today = useMemo(() => dayjs().format('YYYY-MM-DD'), [])

  const todayEvents = useMemo(
    () => events.filter((event) => event.start_date === today),
    [events, today],
  )

  console.log('サイドバー実行')

  return (
    <div className={styles.side}>
      <div className={styles.sideWrapper}>
        <div className={styles.serviceTitle}>
          <Image src={logoImage} alt="logo" width="auto" height={30} />
        </div>

        <div className={styles.menuContainer}>
          <div className={styles.menuBox}>
            <Link
              className={styles.menu}
              href={'http://localhost:3000/reservations'}
            >
              <CalendarIcon />
              <p className={styles.menuText}>Calendar</p>
            </Link>
            <div className={styles.hoverDesign}></div>
          </div>

          <div className={styles.menuBox}>
            <Link className={styles.menu} href="http://localhost:3000/analysis">
              <AnalyticsIcon />
              <p className={styles.menuText}>DashBoard</p>
            </Link>
            <div className={styles.hoverDesign}></div>
          </div>

          <div className={styles.menuBox}>
            <Link className={styles.menu} href="#">
              <MenuIcon />
              <p className={styles.menuText}>Setting</p>
            </Link>
            <div className={styles.hoverDesign}></div>
          </div>
        </div>

        <div className={styles.todayScheduleContainer}>
          <p>
            <span>本日の予定</span>
          </p>
          {todayEvents.length > 0 ? todayEvents.map(renderEvent) : <p></p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
