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
import { auth } from '@/lib/FirebaseConfig'

import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const events = useRecoilValue(eventsAtom)
  const today = useMemo(() => dayjs().format('YYYY-MM-DD'), [])

  const todayEvents = useMemo(
    () => events.filter((event) => event.start_date === today),
    [events, today],
  )

  const handleClickLogout = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.')
        router.push('/')
      })
      .catch((error) => {
        console.error('An error happened during sign-out:', error)
      })
  }

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
              href={`${process.env.NEXT_PUBLIC_FRONT_HOSTNAME}/reservations`}
            >
              <CalendarIcon />
              <p className={styles.menuText}>Calendar</p>
            </Link>
            <div className={styles.hoverDesign}></div>
          </div>

          <div className={styles.menuBox}>
            <Link
              className={styles.menu}
              href={`${process.env.NEXT_PUBLIC_FRONT_HOSTNAME}/analysis`}
            >
              <AnalyticsIcon />
              <p className={styles.menuText}>DashBoard</p>
            </Link>
            <div className={styles.hoverDesign}></div>
          </div>

          <div className={styles.menuBox}>
            <Link
              className={styles.menu}
              onClick={handleClickLogout}
              href={process.env.NEXT_PUBLIC_FRONT_HOSTNAME}
            >
              <MenuIcon />
              <p className={styles.menuText}>Logout</p>
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
