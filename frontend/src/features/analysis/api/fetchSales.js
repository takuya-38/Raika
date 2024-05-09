export const fetchSales = async () => {
  try {
    const res = await fetch('http://localhost:3001/sales')
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching sales:', error)
    return []
  }
}
