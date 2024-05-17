'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/FirebaseConfig'

import Analysis from '@/features/analysis/components/Analysis/Analysis'
import AnalysisHeader from '@/features/analysis/components/AnalysisHeader/AnalysisHeader'
import styles from './style.module.css'

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

  return (
    <div className={styles.container}>
      <AnalysisHeader />
      <Analysis />
    </div>
  )
}

export default Page
