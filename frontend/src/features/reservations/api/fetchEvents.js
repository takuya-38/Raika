'use client'
import { auth } from '@/lib/FirebaseConfig'

export const fetchEvents = async (idToken) => {
  try {
    const idToken = await auth.currentUser.getIdToken()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/google_calendar`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + idToken,
        },
      },
    )
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}
