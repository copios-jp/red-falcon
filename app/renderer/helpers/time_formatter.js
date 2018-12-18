export const formatSeconds = (seconds = 0) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8)
}
