export const fetchDashboardData = async (idToken) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/sales`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + idToken,
      },
    })
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching DashBoardData:', error)
    return []
  }
}
