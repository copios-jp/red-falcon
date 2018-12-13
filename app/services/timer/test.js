import Timer from './'
import lolex from 'lolex'
import { MAX_DURATION } from './'

describe('timer', () => {
  let timer
  let clock
  const setup = () => {
    clock = lolex.install()
    timer = new Timer()

    jest.spyOn(timer, 'removeAllListeners')
    jest.spyOn(timer, 'emit')
    timer.start()
    clock.tick(1000)
  }

  const teardown = () => {
    clock = clock.uninstall()
    timer.removeAllListeners.mockRestore()
    timer.emit.mockRestore()
    timer.stop()
  }

  describe('start', () => {
    beforeEach(setup)
    afterEach(teardown)
    it('has an interval', () => {
      expect(timer.interval).not.toEqual(undefined)
    })

    it('has a date for started at ', () => {
      expect(timer.startedAt).toBeInstanceOf(Date)
    })
  })

  describe('reset', () => {
    beforeEach(setup)
    afterEach(teardown)
    it('value is 0', () => {
      expect(timer.getValue()).toEqual(1)
      timer.reset()
      expect(timer.getValue()).toEqual(0)
    })
  })

  describe('stop', () => {
    beforeEach(() => {
      setup()
      timer.stop()
    })
    afterEach(teardown)


    it('clears the interval', () => {
      expect(timer.interval).toEqual(undefined)
    })

    it('clears the startedAt', () => {
      expect(timer.startedAt).toEqual(undefined)
    })

    it('value is 0', () => {
      expect(timer.getValue()).toEqual(0)
    })

    it('remmoves listeners', () => {
      expect(timer.removeAllListeners).toBeCalled()
    })

    it('emits value of 0', () => {
      expect(timer.emit).toBeCalledWith('tick', 0)
    })
  })

  describe('tick', () => {
    describe('valid', () => {
      beforeEach(setup)
      afterEach(teardown)
      it('emits tick', () => {
        expect(timer.emit).toBeCalledWith('tick', 1)
      })
    })

    describe('invalid', () => {
      beforeAll(() => {
        setup()
        jest.spyOn(timer, 'stop')
        clock.tick(MAX_DURATION * 1000)
      })

      it('calls stop when the timer has run longer than allowed', () => {
        expect(timer.stop).toBeCalled()
      })
    })
  })
})
