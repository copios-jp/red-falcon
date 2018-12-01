jest.mock('usb')
jest.mock('ant-plus')

import usb from 'usb'

import USBScanner from './'
import { SCAN_INTERVAL, receivers } from './'
import Ant from 'ant-plus'

const onImplementation = (bus) => {
  return (event, handler) => {
    let handlers = bus[event]
    if (handlers === undefined) {
      handlers = []
    }
    handlers.push(handler)
    bus[event] = handlers
  }
}

const emitImplementation = (bus) => {
  return function() {
    const args = Array.from(arguments)
    const event = args.shift()
    const handlers = bus[event]
    if (handlers) {
      handlers.forEach((handler) => {
        handler.apply({}, args)
      })
    }
  }
}

Ant.GarminStick2.mockImplementation(() => {})
Ant.GarminStick3.mockImplementation(() => {})

const receiverBus = {}
const receiver = {
  on: jest.fn(onImplementation(receiverBus)),
  once: jest.fn(onImplementation(receiverBus)),
  emit: jest.fn(emitImplementation(receiverBus)),
  activate: jest.fn(),
  deactivate: jest.fn(),
}

jest.useFakeTimers()

const teardown = () => {
  ;[...receivers].forEach((receiver, index) => {
    receivers.splice(index, 1)
  })
}

describe('USBScanner', () => {
  describe('activate', () => {
    describe('when not active', () => {
      beforeEach(() => {
        USBScanner.isActive = false
        USBScanner.intervalId = undefined
        usb.getDeviceList.mockImplementation(() => {
          return []
        })
        jest.spyOn(USBScanner, 'scan')
        USBScanner.activate()
      })
      afterEach(teardown)
      it('scans', () => {
        expect(USBScanner.scan).toBeCalled()
      })

      it('sets scan interval', () => {
        expect(setInterval).toBeCalledWith(USBScanner.scan, SCAN_INTERVAL)
        expect(USBScanner.intervalId).toBeGreaterThan(0)
      })

      it('isActive', () => {
        expect(USBScanner.isActive).toEqual(true)
      })
    })

    describe('when active', () => {
      beforeEach(() => {
        USBScanner.intervalId = undefined
        jest.spyOn(USBScanner, 'scan')
        USBScanner.isActive = true
        USBScanner.activate()
      })
      afterEach(teardown)

      it('doesnt scan', () => {
        expect(USBScanner.scan.mock.calls.length).toEqual(0)
      })

      it('doesnt setup the interval', () => {
        expect(USBScanner.intervalId).toEqual(undefined)
      })
    })
  })

  describe('add', () => {
    beforeEach(() => {
      jest.spyOn(USBScanner, 'emit')
      USBScanner.add(receiver)
    })
    afterEach(teardown)

    it('adds a receiver', () => {
      expect(receivers.length).toEqual(1)
    })
    it('subscribes to remove once', () => {
      expect(receiver.once).toBeCalledWith('remove', USBScanner.remove)
    })

    it('emits receiver-added', () => {
      expect(USBScanner.emit).toBeCalledWith('receiver-added', receiver, receivers)
    })

    it('activated the receiver', () => {
      expect(receiver.activate).toBeCalled()
    })
  })

  describe('deactivate', () => {
    describe('when active', () => {
      beforeEach(() => {
        jest.spyOn(USBScanner, 'remove')
        USBScanner.isActivate = true
        receivers.push(receiver)
        USBScanner.deactivate()
      })
      afterEach(teardown)

      it('removes all receivers', () => {
        expect(USBScanner.remove).toBeCalledWith(receiver)
      })

      it('clears the scan interval', () => {
        expect(USBScanner.intervalId).toEqual(undefined)
      })

      it('is not longer active', () => {
        expect(USBScanner.isActive).toEqual(false)
      })
    })
    describe('when not active', () => {
      beforeEach(() => {
        USBScanner.isActivate = false
        receivers.push(receiver)
        USBScanner.deactivate()
      })
      afterEach(teardown)

      it('does not remove receivers', () => {
        expect(USBScanner.remove.mock.calls.length).toEqual(0)
      })
    })
  })

  describe('remove', () => {
    beforeEach(() => {
      ;[...receivers].forEach((receiver, index) => {
        receivers.splice(index, 1)
      })
      receivers.push(receiver)
      jest.spyOn(receivers, 'splice')
      USBScanner.remove(receivers[0])
    })
    afterEach(teardown)

    it('removes the receiver', () => {
      expect(receivers.length).toEqual(0)
    })

    it('deactivates the receiver', () => {
      expect(receiver.deactivate).toBeCalled()
    })

    it('emits receiver-removed', () => {
      expect(USBScanner.emit).toBeCalledWith('receiver-removed', receiver, receivers)
    })
  })

  describe('scan', () => {
    beforeEach(() => {})
    afterEach(teardown)

    describe('remove missing receivers', () => {
    })

    describe('no new devices', () => {
    })

    describe('new device', () => {
    })
  })
})
