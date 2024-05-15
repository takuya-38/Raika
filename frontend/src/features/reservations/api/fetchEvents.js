import { auth } from '@/lib/FirebaseConfig'

export const fetchEvents = async (idToken) => {
  try {
    const res = await fetch('http://localhost:3001/google_calendar', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + idToken,
      },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}
