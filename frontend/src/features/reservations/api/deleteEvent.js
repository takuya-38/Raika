export const deleteEvent = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/google_calendar/${id}`,
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
