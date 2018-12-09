import MaxHeartRateCalculators from './MaxHeartRateCalculators'
import { FOX, MANUAL, NES, GULATI, ROBERGS, TANAKA, methods } from './MaxHeartRateCalculators'

const MANUAL_MAX = 47
const test = {
  [FOX]: 197,
  [MANUAL]: MANUAL_MAX,
  [NES]: 196,
  [GULATI]: 190,
  [ROBERGS]: 190,
  [TANAKA]: 192,
}
const AGE = 23

describe('MaxHeartRateCalculators', () => {
  Object.keys(methods).forEach((methodName) => {
    describe(`${methodName}`, () => {
      const method = methods[methodName]
      it(`has ${methodName} as id`, () => {
        expect(method.id).toEqual(methodName)
      })

      it('returns the correct value', () => {
        expect(method.using({ age: AGE, max: MANUAL_MAX })).toEqual(test[methodName])
      })
    })
  })
})

describe('forMethod', () => {
  Object.keys(methods).forEach((methodName) => {
    it(`returns the  ${methodName} calculator`, () => {
      expect(MaxHeartRateCalculators.forMethod(methodName)).toEqual(methods[methodName])
    })
  })

  it('retuns FOX if the method requested is not found', () => {
    expect(MaxHeartRateCalculators.forMethod('wazzat?')).toEqual(methods[FOX])
  })
})
