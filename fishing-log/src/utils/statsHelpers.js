export const getTotalCatches = (catches) => catches.length

export const getHeaviestCatch = (catches) => {
  if (!catches.length) return null
  return catches.reduce((max, c) => (c.weight > max.weight ? c : max), catches[0])
}

export const getMostCaughtSpecies = (catches) => {
  if (!catches.length) return null
  const counts = catches.reduce((acc, c) => {
    acc[c.species] = (acc[c.species] || 0) + 1
    return acc
  }, {})
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

export const getCatchesThisMonth = (catches) => {
  const now = new Date()
  return catches.filter((c) => {
    const d = new Date(c.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  }).length
}

export const getCatchesBySpecies = (catches) => {
  const counts = catches.reduce((acc, c) => {
    acc[c.species] = (acc[c.species] || 0) + 1
    return acc
  }, {})
  return Object.entries(counts)
    .map(([species, count]) => ({ species, count }))
    .sort((a, b) => b.count - a.count)
}

export const getCatchesOverTime = (catches) => {
  const counts = catches.reduce((acc, c) => {
    const date = c.date.slice(0, 7) // YYYY-MM
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})
  return Object.entries(counts)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month))
}

export const getPersonalBests = (catches) => {
  const bests = catches.reduce((acc, c) => {
    if (!acc[c.species] || c.weight > acc[c.species].weight) {
      acc[c.species] = c
    }
    return acc
  }, {})
  return Object.values(bests).sort((a, b) => b.weight - a.weight)
}