export const showSales = async (id, idToken) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/sales/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + idToken,
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    if (response.status === 204) {
      return null
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}
