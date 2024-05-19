'use client'
import { auth } from '@/lib/FirebaseConfig'

export const updateEvent = async (eventData, id) => {
  try {
    const idToken = await auth.currentUser.getIdToken()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/google_calendar/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + idToken,
        },
        body: JSON.stringify(eventData),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}
