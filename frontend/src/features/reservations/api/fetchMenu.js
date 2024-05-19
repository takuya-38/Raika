export const fetchMenus = async (idToken) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/menus`, {
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
