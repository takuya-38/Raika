export const showSales = async (id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOSTNAME}/sales/${id}`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching events:', error)
  }
}
