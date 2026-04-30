export const formatWeight = (weight, unit = 'lbs') => {
  if (!weight && weight !== 0) return '—'
  return `${parseFloat(weight).toFixed(2)} ${unit}`
}

export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const formatMonth = (monthStr) => {
  if (!monthStr) return '—'
  const [year, month] = monthStr.split('-')
  const date = new Date(year, parseInt(month) - 1)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}