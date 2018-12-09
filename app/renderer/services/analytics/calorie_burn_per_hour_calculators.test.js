import CalorieBurnPerHourCalculators from './CalorieBurnPerHourCalculators'
import { FEMALE, MALE, UNKNOWN, methods } from './CalorieBurnPerHourCalculators'

const test = {
  [MALE]: 204,
  [FEMALE]: 403,
  [UNKNOWN]: 304,
}

const AGE = 23
const RATE = 123
const WEIGHT = 65

const sensor = {
  age: AGE,
  rate: RATE,
  weight: WEIGHT,
}

describe('CalorieBurnPerHourCalculators', () => {
  Object.keys(methods).forEach((methodName) => {
    describe(`${methodName}`, () => {
      const method = methods[methodName]
      it('returns the correct value', () => {
        expect(method.using(sensor)).toEqual(test[methodName])
      })
    })
  })
})

describe('forSex', () => {
  it('returns the correct calculator for the provided sex', () => {
    expect(CalorieBurnPerHourCalculators.forSex(MALE)).toEqual(methods[MALE])
    expect(CalorieBurnPerHourCalculators.forSex(FEMALE)).toEqual(methods[FEMALE])
    expect(CalorieBurnPerHourCalculators.forSex('WHAAAATTTT?')).toEqual(methods[UNKNOWN])
  })
})
