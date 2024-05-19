'use client'
import { auth } from '@/lib/FirebaseConfig'

export const createSales = async (eventData) => {
  try {
    const idToken = await auth.currentUser.getIdToken()
    const response = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/sales`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + idToken,
      },
      body: JSON.stringify(eventData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    } else {
      console.log(JSON.stringify(eventData))
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}
