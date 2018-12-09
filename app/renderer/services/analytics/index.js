import MaxHeartRateCalculators from './MaxHeartRateCalculators'
import CalorieBurnPerHourCalculators from './CalorieBurnPerHourCalculators'
import { FOX as fox } from './MaxHeartRateCalculators'

export const getMaxHeartRate = (sensor) => {
  const { method } = sensor
  const calculator = MaxHeartRateCalculators.forMethod(method)
  return Math.round(calculator.using(sensor))
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

export const FOX = fox

export const snapshot = (sensor) => {
  return JSON.parse(
    JSON.stringify({
      ...sensor,
      max: getMaxHeartRate(sensor),
      calories: getCalories(sensor),
      percent: getPercentageOfMax(sensor),
      zone: getZone(sensor),
      created: new Date(),
    }),
  )
}
