const DEFAULT_ZONE_COEFFICIENTS = [0, 0.5, 0.6, 0.7, 0.8, 0.9]

const calorieBurn = {
  M(rate, weight, age) {
    return ((-55.0969 + 0.6309 * rate - 0.1988 * weight + 0.2017 * age) / 4.184) * 60 * 1
  },
  F(rate, weight, age) {
    return ((-20.4022 + 0.4472 * rate - 0.1263 * weight + 0.074 * age) / 4.184) * 60 * 1
  },
}

import methods from './maxHeartRateCalculations'

export const analyticsFor = (props) => {
  const { method, age = 35, max, sex, name } = props
  const implementation = methods[method]
  if (!implementation) {
    throw `Invalid analytics max heart rate calculation method: ${method}`
  }

  return {
    method,
    name,
    coefficients: [].concat(DEFAULT_ZONE_COEFFICIENTS),
    rate: 0,
    at: implementation.at,
    max: max || implementation.at(age),
    age,
    weight: 0,
    sex: sex || 'M',
    setMethod(newMethod) {
      this.method = newMethod
      const newImplementation = methods[this.method]
      this.at = newImplementation.at
    },
    getCalories() {
      const burnRate = calorieBurn[this.sex]
      if (burnRate && this.rate && this.weight && this.age) {
        return Math.round(burnRate(this.rate, this.weight, this.age))
      }
    },
    getPercentage() {
      return Math.round((this.rate / this.max) * 100)
    },
    getZone() {
      let zone = 0
      let limit = Math.round(this.coefficients[zone] * this.max)
      while (limit < this.rate) {
        limit = Math.round(this.coefficients[++zone] * this.max)
      }
      return zone - 1
    },
    snapshot() {
      return JSON.parse(
        JSON.stringify({
          ...this,
          calories: this.getCalories(),
          percent: this.getPercentage(),
          zone: this.getZone(),
          created: new Date(),
        }),
      )
    },
  }
}
