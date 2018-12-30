export const formatSeconds = (seconds = 0, start = 11, length = 8) => {
  return new Date(seconds * 1000).toISOString().substr(start, length)
}

export const formatDateTime = (
  date = new Date(),
  formatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  },
) => {
  return new Date(date).toLocaleString('ja', formatOptions)
}
