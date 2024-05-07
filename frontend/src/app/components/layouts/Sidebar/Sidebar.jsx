'use client'
import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dayjs from 'dayjs'
import { useRecoilValue } from 'recoil'
import { eventsAtom } from '@/app/components/store/events'
import styles from './Sidebar.module.css'

const renderMenu = (icon, text, href) => (
  <Link className={styles.menu} href={href}>
    <Image src={icon} alt={text} width={24} height={24} />
    <p className={styles.menuText}>{text}</p>
  </Link>
)

const renderEvent = (event) => (
  <div key={event.id} className={styles.eventItem}>
    <div className={styles.eventIcon}>
      <Image src="/icons/check.svg" alt="Check" width={24} height={24} />
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
        <div className={styles.serviceTitle}>Raika</div>
        <div className={styles.menuContainer}>
          {renderMenu('/icons/calendar.svg', 'スケジュール', '#')}
          {renderMenu('/icons/analytics.svg', '売上分析', '#')}
          {renderMenu('/icons/menu.svg', 'メニュー設定', '#')}
        </div>

        <div className={styles.todayScheduleContainer}>
          <p>本日の予定</p>
          {todayEvents.length > 0 ? todayEvents.map(renderEvent) : <p></p>}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
