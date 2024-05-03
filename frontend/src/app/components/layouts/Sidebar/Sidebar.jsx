'use client'
import { useState } from 'react'
import styles from './Sidebar.module.css'
import Link from 'next/link'

const Sidebar = () => {
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
        <div className={styles.menuContainer}>
          <div className={styles.menu}>
            <Link href="#">スケジュール</Link>
          </div>
          <div className={styles.menu}>
            <Link href="#">メニュー設定</Link>
          </div>
          <div className={styles.menu}>
            <Link href="#">売上分析</Link>
          </div>
        </div>

        <div className={styles.todaySchedule}>
          <p>本日の予定</p>
          <ul className={styles.eventContainer}>
            <li className={styles.event}>田中さん</li>
            <li className={styles.event}>加藤さん</li>
            <li className={styles.event}>木村さん</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
