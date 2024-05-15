export const fetchMenus = async (idToken) => {
  try {
    const res = await fetch('http://localhost:3001/menus', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + idToken,
      },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching events:', error)
    return []
  }
}
