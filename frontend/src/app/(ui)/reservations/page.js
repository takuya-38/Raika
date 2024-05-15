'use client'
import '@/app/globals.css'
import { Reservations } from '@/features/reservations/components/Reservations/Reservations'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/FirebaseConfig'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'

const ReservationsPage = () => {
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
    <div className="container">
      {/* <div className="pageTitleWrapper">
        <span className="pageTitle">Calendar</span>
      </div> */}
      <Reservations />
    </div>
  )
}

export default ReservationsPage
