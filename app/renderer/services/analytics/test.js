import { getMaxHeartRate, getPercentageOfMax, getZone, getCalories, snapshot } from './'
import MaxHeartRateCalculators from './MaxHeartRateCalculators'
import { methods, NES, FOX } from './MaxHeartRateCalculators'

import lolex from 'lolex'

const NES_MAX = 196
const AGE = 23
const RATE = 123
const WEIGHT = 65
const COEFFICIENTS = [0, 0.5, 0.6, 0.7, 0.8, 0.9]

describe('Analytics', () => {
  describe('getCalories', () => {
    const sensor = {
      age: AGE,
      rate: RATE,
      weight: WEIGHT,
    }
    it('gets calories', () => {
      expect(getCalories(sensor)).toEqual(304)
    })
  })

  describe('snapshot', () => {
    const sensor = {
      coefficients: [...COEFFICIENTS],
      age: AGE,
      rate: RATE,
      weight: WEIGHT,
    }
    let clock
    beforeEach(() => {
      clock = lolex.install()
    })
    afterEach(() => {
      clock = clock.uninstall()
    })

    it('gets a snapshot', () => {
      expect(snapshot(sensor)).toEqual({
        age: 23,
        calories: 304,
        coefficients: [0, 0.5, 0.6, 0.7, 0.8, 0.9],
        created: new Date().toISOString(),
        max: 197,
        percent: 62,
        rate: 123,
        weight: 65,
        zone: 2,
      })
    })
  })

  describe('getMaxHeartRate', () => {
    let sensor
    const setup = (props) => {
      sensor = Object.assign(
        {
          method: NES,
          age: AGE,
        },
        props,
      )

      jest.spyOn(MaxHeartRateCalculators, 'forMethod')
      const method = methods[sensor.method] || methods[FOX]
      jest.spyOn(method, 'using')

      getMaxHeartRate(sensor)
    }

    const teardown = () => {
      const method = methods[sensor.method] || methods[FOX]
      method.using.mockRestore()
      MaxHeartRateCalculators.forMethod.mockRestore()
    }

    afterAll(teardown)

    describe('calculator', () => {
      afterEach(teardown)

      it('uses the configured calculator based on method propery', () => {
        setup()
        expect(methods[NES].using).toBeCalledWith(sensor)
      })

      it('uses FOX calculator when method does not exist', () => {
        setup({ method: 'foo' })
        expect(methods[FOX].using).toBeCalledWith(sensor)
      })
    })

    it('returns the rounded value from the calculator', () => {
      setup()
      expect(getMaxHeartRate(sensor)).toEqual(NES_MAX)
    })
  })

  describe('getPercentageOfMax', () => {
    it('returns the rounded percentage of max for the sensor rate', () => {
      expect(getPercentageOfMax({ method: NES, age: AGE, rate: NES_MAX / 2 })).toEqual(50)
    })
  })

  describe('getZone', () => {
    const sensor = {
      coefficients: [...COEFFICIENTS],
      age: AGE,
      rate: NES_MAX * 0.4,
      method: NES,
    }
    it('returns 0 for rest', () => {
      sensor.rate = NES_MAX * 0.4
      expect(getZone(sensor)).toEqual(0)
    })

    it('returns 1 for recovery', () => {
      sensor.rate = NES_MAX * 0.55
      expect(getZone(sensor)).toEqual(1)
    })

    it('returns 2 for light exercise', () => {
      sensor.rate = NES_MAX * 0.61
      expect(getZone(sensor)).toEqual(2)
    })

    it('returns 3 for aerobic exercise', () => {
      sensor.rate = NES_MAX * 0.71
      expect(getZone(sensor)).toEqual(3)
    })

    it('returns 4 for anerobic exercise', () => {
      sensor.rate = NES_MAX * 0.81
      expect(getZone(sensor)).toEqual(4)
    })

    it('returns 5 for max exercise', () => {
      sensor.rate = NES_MAX * 0.91
      expect(getZone(sensor)).toEqual(5)
    })
    it('returns 4 at exactly 89% of max', () => {
      sensor.rate = NES_MAX * 0.89
      expect(getZone(sensor)).toEqual(4)
    })

    it('returns 5 at exactly 90% fo max', () => {
      sensor.rate = NES_MAX * 0.9
      expect(getZone(sensor)).toEqual(5)
    })
  })
})
