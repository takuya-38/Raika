'use client'
import styles from './style.module.css'
import Analysis from '@/features/analysis/components/Analysis/Analysis'
import { auth } from '@/lib/FirebaseConfig'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

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
    <div className={styles.main}>
      <Analysis />
    </div>
  )
}

export default Page
