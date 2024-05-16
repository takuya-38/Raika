'use client'
import styles from './style.module.css'
import Analysis from '@/features/analysis/components/Analysis/Analysis'
import { auth } from '@/lib/FirebaseConfig'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

import AnalysisHeader from '@/features/analysis/components/AnalysisHeader/AnalysisHeader'

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

  // const { value } = useTabContext()

  // const renderTabContent = (value) => {
  //   switch (value) {
  //     case '1':
  //       return <Welcome />
  //     case '2':
  //       return <About />
  //     case '3':
  //       return <Articles />
  //   }
  // }

  return (
    <>
      <AnalysisHeader />
      {/* {renderTabContent(value)} */}
    </>
  )

  // return (
  //   <div className={styles.main}>
  //     <Analysis />
  //   </div>
  // )
}

export default Page
