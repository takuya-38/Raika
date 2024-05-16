'use client'
import styles from './style.module.css'
import Analysis from '@/features/analysis/components/Analysis/Analysis'
import { auth } from '@/lib/FirebaseConfig'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

import AnalysisHeader from '@/features/analysis/components/AnalysisHeader/AnalysisHeader'
import Home from '@/features/analysis/components/Home/Home'
import { useTabContext } from '@/app/components/provider/tabProvider'

const Page = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || user.email !== process.env.NEXT_PUBLIC_APPLY_MAIL) {
        router.push('/')
        // redirect('/')
      } else {
        setLoading(false)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  if (loading) {
    return <div></div>
  }

  const { value } = useTabContext()

  const renderTabContent = (value) => {
    switch (value) {
      case '1':
        return <Home />
      case '2':
        return
      case '3':
        return
    }
  }

  return (
    <div className={styles.container}>
      <AnalysisHeader />
      <div className={styles.mainWrapper}>{renderTabContent(value)}</div>
    </div>
  )

  // return (
  //   <div className={styles.main}>
  //     <Analysis />
  //   </div>
  // )
}

export default Page
