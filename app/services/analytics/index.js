import MaxHeartRateCalculators from './MaxHeartRateCalculators'
import SessionStats from './SessionStats'
import CalorieBurnPerHourCalculators from './CalorieBurnPerHourCalculators'
import { FOX as fox } from './MaxHeartRateCalculators'

export const getMaxHeartRate = (sensor) => {
  const { method } = sensor
  const calculator = MaxHeartRateCalculators.forMethod(method)
  const rate = calculator.using(sensor)

  return rate ? Math.round(calculator.using(sensor)) : undefined
}

export const getCalories = (sensor) => {
  const { sex } = sensor
  const calculator = CalorieBurnPerHourCalculators.forSex(sex)
  return calculator.using(sensor)
}

export const getPercentageOfMax = (sensor) => {
  const { rate } = sensor
  return Math.round((rate / getMaxHeartRate(sensor)) * 100)
}

export const getZone = (sensor) => {
  const { coefficients, rate } = sensor
  const max = getMaxHeartRate(sensor)
  let zone = 0
  let limit = Math.round(coefficients[zone] * max)

  while (limit < rate) {
    limit = Math.round(coefficients[++zone] * max)
  }
  return zone - 1
}

export const getBMI = ({ weight = 1, height = 1 }) => {
  return ((((weight / height) * 100) / height) * 100).toFixed(1)
}

export const getReport = (history) => {
  return { ...SessionStats.forHistory(history), history: history }
}

export const FOX = fox

export const snapshot = (sensor) => {
  const snap = { ...sensor }
  delete snap.history

  return {
    ...snap,
    max: getMaxHeartRate(snap),
    calories: getCalories(snap),
    percent: getPercentageOfMax(snap),
    zone: getZone(snap),
    created: new Date(),
  }
}
