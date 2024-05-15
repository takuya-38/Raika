export const fetchSales = async (idToken) => {
  try {
    const res = await fetch('http://localhost:3001/sales', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + idToken,
      },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching sales:', error)
    return []
  }
}
