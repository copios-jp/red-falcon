import React from 'react'
import { shallow } from 'enzyme'
import { MANUAL } from '../../../services/analytics/MaxHeartRateCalculators/'
import { DEFAULT_ZONE_COEFFICIENTS } from '../sensor/'

jest.mock('../../../services/timer/', () => {
  return function() {
    this.on = jest.fn()
    this.start = jest.fn()
    this.stop = jest.fn()
    this.reset = jest.fn()
    this.value = 61
  }
})

import StopWatch from './'

describe('Timer', () => {
  let subject
  let instance

  const defaultProps = {
    time: 61,
    sensor: {
      method: MANUAL,
      rate: 50,
      max: 100,
      coefficients: [].concat(DEFAULT_ZONE_COEFFICIENTS),
    },
  }

  const setup = () => {
    subject = shallow(<StopWatch {...defaultProps} />)
    instance = subject.dive().instance()
  }

  beforeAll(() => {
    setup()
  })

  describe('component did mount', () => {
    it('registers timer.on tick', () => {
      const instance = subject.dive().instance()
      expect(instance.timer.on).toBeCalledWith('tick', instance.update)
    })
    it('starts the timer', () => {
      expect(instance.timer.start).toBeCalled()
    })
  })

  describe('component will unmount', () => {
    beforeEach(() => {
      instance.componentWillUnmount()
    })

    it('stops the timer', () => {
      expect(instance.timer.stop).toBeCalled()
    })
  })

  describe('component did update', () => {
    describe('same zone', () => {
      beforeEach(() => {
        instance.componentDidUpdate(defaultProps)
      })
      it('does not reset the timer', () => {
        expect(instance.timer.reset).not.toBeCalled()
      })
    })

    describe('different zone', () => {
      beforeEach(() => {
        const nextProps = {
          sensor: { ...defaultProps.sensor, rate: 70 },
        }
        instance.props = nextProps
        instance.componentDidUpdate(defaultProps)
      })
      it('resets the timer', () => {
        expect(instance.timer.reset).toBeCalled()
      })
    })
  })

  describe('render', () => {
    it('renders a div with formatted time', () => {
      expect(subject.dive().text()).toMatch(/01:01/)
    })
  })

  describe('update', () => {
    beforeEach(() => {
      instance.update(71)
    })
    it('updates state.time', () => {
      expect(instance.state.time).toEqual(71)
    })
  })
})
