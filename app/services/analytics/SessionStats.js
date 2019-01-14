import { getZone, getCalories, getPercentageOfMax } from './'

export const trainingScore = (history) => {
  return (
    parseFloat(
      (
        history.reduce((memo, item) => {
          return memo + getZone(item)
        }, 0) / history.length
      ).toFixed(2),
    ) + 1
  )
}

export const averageHeartRate = (history) => {
  const reducer = (memo, item) => memo + parseInt(item.rate)
  const total = history.reduce(reducer, 0)
  return Math.round(total / history.length)
}

const fromAverageHeartRate = (history, dataFacet) => {
  const rate = averageHeartRate(history)
  return dataFacet({
    ...history[0],
    rate,
  })
}

export const averagePercentageOfMax = (history) => {
  return fromAverageHeartRate(history, getPercentageOfMax)
}

export const averageHeartRateZone = (history) => {
  return fromAverageHeartRate(history, getZone)
}

export const caloriesExpended = (history) => {
  return (fromAverageHeartRate(history, getCalories) / 3600) * duration(history)
}

export const timeInZones = (history) => {
  const commonHistory = history[0]
  const zones = new Array(commonHistory.coefficients.length).fill(0)
  history.forEach(({ zone }) => {
    zones[zone] += 1
  })

  return zones
}

export const minamiPoints = (history) => {
  const zones = timeInZones(history)
  return zones[5] / 10
}

export const duration = (history) => {
  const first = Date.parse(history[0].created)
  const last = Date.parse(history[history.length - 1].created)
  return Math.ceil((last - first) / 1000)
}

export default {
  forHistory(history) {
    return {
      rate: averageHeartRate(history),
      maxRate: Math.max(...history.map((item) => item.rate)),
      percentageOfMax: averagePercentageOfMax(history),
      zone: averageHeartRateZone(history),
      calories: caloriesExpended(history),
      duration: duration(history),
      zones: timeInZones(history),
      points: minamiPoints(history),
      score: trainingScore(history),
    }
  },
}
