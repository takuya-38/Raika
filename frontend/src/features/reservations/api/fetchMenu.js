export const fetchMenus = async () => {
  try {
    const res = await fetch('http://localhost:3001/menus')
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}
