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
    jest.spyOn(timer.timer, 'setInterval')
    jest.spyOn(timer.timer, 'clearInterval').mockImplementation(jest.fn())
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
    beforeEach(() => {
      setup()
    })
    afterEach(teardown)
    it('has an interval', () => {
      expect(timer.timer.setInterval).toBeCalledWith(timer.tick, '', '1s')
    })
  })

  describe('reset', () => {
    beforeEach(setup)
    afterEach(teardown)
    it('value is 0', () => {
      expect(timer.value).toEqual(1)
      timer.reset()
      expect(timer.value).toEqual(0)
    })
  })

  describe('stop', () => {
    beforeEach(() => {
      setup()
      jest.spyOn(timer.timer, 'clearInterval')
      timer.stop()
    })
    afterEach(teardown)

    it('clears the interval', () => {
      expect(timer.timer.clearInterval).toBeCalled()
    })

    it('value is 0', () => {
      expect(timer.value).toEqual(0)
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

    describe('running for more than an hour', () => {
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
