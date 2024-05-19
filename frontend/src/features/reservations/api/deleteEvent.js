'use client'
import { auth } from '@/lib/FirebaseConfig'

export const deleteEvent = async (id) => {
  try {
    const idToken = await auth.currentUser.getIdToken()
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/google_calendar/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + idToken,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}
