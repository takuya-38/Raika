export const updateEvent = async (eventData, id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/google_calendar/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
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
