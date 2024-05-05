export const deleteEvent = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:3001/google_calendar/${id}`,
      {
        method: 'DELETE',
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}
