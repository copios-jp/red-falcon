import { scanner } from './'
import { SCAN_INTERVAL, receivers } from './'
/*
Ant.GarminStick2.mockImplementation(() => {})
Ant.GarminStick3.mockImplementation(() => {})
*/

const receiverBus = {}

let receiver

const teardown = () => {
  ;[...receivers].forEach((receiver, index) => {
    receivers.splice(index, 1)
  })
}

const setup = () => {
  receiver = {
    on: jest.fn(helpers.onImplementation(receiverBus)),
    once: jest.fn(helpers.onImplementation(receiverBus)),
    emit: jest.fn(helpers.emitImplementation(receiverBus)),
    activate: jest.fn(),
    deactivate: jest.fn(),
  }
  scanner.isActive = false
  scanner.intervalId = undefined
}

jest.useFakeTimers()

describe('scanner', () => {
  describe('activate', () => {
    describe('when not active', () => {
      const spy = jest.spyOn(scanner, 'scan')
      beforeAll(() => {
        setup()
        scanner.activate()
      })
      afterAll(() => {
        teardown()
        spy.mockRestore()
      })

      it('scans', () => {
        expect(spy).toBeCalled()
      })

      it('sets scan interval', () => {
        expect(setInterval).toBeCalledWith(scanner.scan, SCAN_INTERVAL)
        expect(scanner.intervalId).toBeGreaterThan(0)
      })

      it('isActive', () => {
        expect(scanner.isActive).toEqual(true)
      })
    })

    describe('when active', () => {
      const spy = jest.spyOn(scanner, 'scan')
      beforeAll(() => {
        setup()
        scanner.isActive = true
        scanner.activate()
      })
      afterAll(() => {
        teardown()
        spy.mockRestore()
        scanner.scan.mockRestore()
      })

      it('doesnt scan', () => {
        expect(spy.mock.calls.length).toEqual(0)
      })

      it('doesnt setup the interval', () => {
        expect(scanner.intervalId).toEqual(undefined)
      })
    })
  })

  describe('add', () => {
    beforeAll(() => {
      setup()
      jest.spyOn(scanner, 'emit')
      scanner.add(receiver)
    })
    afterAll(teardown)

    it('adds a receiver', () => {
      expect(receivers.length).toEqual(1)
    })
    it('subscribes to remove once', () => {
      expect(receiver.once).toBeCalledWith('remove', scanner.remove)
    })

    it('emits receiver-added', () => {
      expect(scanner.emit).toBeCalledWith('receiver-added', receiver, receivers)
    })

    it('activated the receiver', () => {
      expect(receiver.activate).toBeCalled()
    })
  })

  describe('deactivate', () => {
    describe('when active', () => {
      const spy = jest.spyOn(scanner, 'remove')
      beforeAll(() => {
        setup()
        scanner.isActive = true
        receivers.push(receiver)
        scanner.deactivate()
      })
      afterAll(() => {
        teardown()
        spy.mockRestore()
      })

      it('removes all receivers', () => {
        expect(spy).toBeCalledWith(receiver)
      })

      it('clears the scan interval', () => {
        expect(scanner.intervalId).toEqual(undefined)
      })

      it('is not longer active', () => {
        expect(scanner.isActive).toEqual(false)
      })
    })
    describe('when not active', () => {
      const spy = jest.spyOn(scanner, 'remove')
      beforeAll(() => {
        setup()
        scanner.isActive = false
        receivers.push(receiver)
        scanner.deactivate()
      })
      afterAll(() => {
        teardown()
        spy.mockRestore()
      })

      it('does not remove receivers', () => {
        expect(spy.mock.calls.length).toEqual(0)
      })
    })
  })

  describe('remove', () => {
    beforeAll(() => {
      setup()
      ;[...receivers].forEach((receiver, index) => {
        receivers.splice(index, 1)
      })
      receivers.push(receiver)
      jest.spyOn(receivers, 'splice')
      jest.spyOn(scanner, 'emit')
      scanner.remove(receivers[0])
    })
    afterAll(teardown)

    it('removes the receiver', () => {
      expect(receivers.length).toEqual(0)
    })

    it('deactivates the receiver', () => {
      expect(receiver.deactivate).toBeCalled()
    })

    it('emits receiver-removed', () => {
      expect(scanner.emit).toBeCalledWith('receiver-removed', receiver, receivers)
    })
  })

  describe('scan', () => {
    beforeAll(() => {
      setup()
    })
    afterAll(teardown)

    describe('remove missing receivers', () => {})

    describe('no new devices', () => {})

    describe('new device', () => {})
  })
})
