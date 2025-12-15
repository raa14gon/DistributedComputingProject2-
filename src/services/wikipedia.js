export async function getRaceHistory(title) {
  try {
    const res = await fetch(
      `/wiki/page/summary/${encodeURIComponent(title)}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    )
    if (!res.ok) {
      console.warn('Wikipedia article not found:', title)
      return null
    }
    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching race history:', error)
    return null
  }
}