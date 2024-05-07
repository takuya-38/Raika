export const createEvent = async (eventData) => {
  try {
    const response = await fetch('http://localhost:3001/google_calendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}
