export async function getRacesByYear(year) {
  const response = await fetch(`/ergast/api/f1/${year}/races.json`)
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`)
  }
  const data = await response.json()
  return data.MRData.RaceTable.Races
}