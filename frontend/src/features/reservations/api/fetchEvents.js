export const fetchEvents = async () => {
  try {
    const res = await fetch('http://localhost:3001/google_calendar')
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}
