import { scanner } from './'
import { SCAN_INTERVAL, receivers } from './'
import { GarminStick2 } from 'ant-plus'
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
  scanner.on.mockRestore()
  scanner.add.mockRestore()
}
const webContents = {
  send: jest.fn(),
}
const setup = () => {
  receiver = {
    on: jest.fn(helpers.onImplementation(receiverBus)),
    once: jest.fn(helpers.onImplementation(receiverBus)),
    emit: jest.fn(helpers.emitImplementation(receiverBus)),
    activate: jest.fn(),
    deactivate: jest.fn(),
  }
  jest.spyOn(scanner, 'on')
  jest.spyOn(scanner, 'add')
  scanner.isActive = false
  scanner.intervalId = undefined
}

const transmitterBus = {}
const transmitter = {
  activate: jest.fn(),
  deactivate: jest.fn(),
  on: jest.fn(helpers.onImplementation(transmitterBus)),
  emit: jest.fn(helpers.emitImplementation(transmitterBus)),
  once: jest.fn(helpers.onImplementation(transmitterBus)),
}

jest.useFakeTimers()

describe('scanner', () => {
  describe('activate', () => {
    describe('when not active', () => {
      const spy = jest.spyOn(scanner, 'scan')
      beforeAll(() => {
        setup()
        scanner.activate(webContents)
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

      it('binds receiver added', () => {
        expect(scanner.on.mock.calls[0][0]).toEqual('receiver-added')
      })

      it('binds receiver removed', () => {
        expect(scanner.on.mock.calls[1][0]).toEqual('receiver-removed')
      })
    })

    describe('when active', () => {
      const spy = jest.spyOn(scanner, 'scan')
      beforeAll(() => {
        setup()
        scanner.isActive = true
        scanner.activate(webContents)
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
        jest.spyOn(scanner, 'removeAllListeners')
        scanner.deactivate()
      })
      afterAll(() => {
        teardown()
        spy.mockRestore()
        scanner.removeAllListeners.mockRestore()
      })

      it('removes all receivers', () => {
        expect(spy).toBeCalledWith(receiver)
      })

      it('clears the scan interval', () => {
        expect(scanner.intervalId).toEqual(undefined)
      })

      it('removes listeners', () => {
        expect(scanner.removeAllListeners).toBeCalled()
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

  describe('events', () => {
    describe('transmitter', () => {
      beforeAll(() => {
        scanner.activate(webContents)
        scanner.add(receiver)
        receiver.emit('transmitter-added', transmitter, [transmitter])
        receiver.emit('transmitter-removed', transmitter, [transmitter])
        transmitter.emit('transmitter-data', transmitter)
      })

      afterAll(teardown)

      it('sends transmitter-added', () => {
        expect(webContents.send).toBeCalledWith('transmitter-added', transmitter, [transmitter])
      })
      it('sends transmitter-removed', () => {
        expect(webContents.send).toBeCalledWith('transmitter-removed', transmitter, [transmitter])
      })
      it('sends transmitter-data', () => {
        expect(webContents.send).toBeCalledWith('transmitter-data', transmitter)
      })
    })

    describe('reciever', () => {
      beforeAll(() => {
        scanner.activate(webContents)
        scanner.emit('receiver-added', receiver, [receiver])
        scanner.emit('receiver-removed', receiver, [receiver])
      })

      afterAll(teardown)
      it('sends receiver added', () => {
        expect(webContents.send).toBeCalledWith('receiver-added', receiver, [receiver])
      })

      it('sends receiver removed', () => {
        expect(webContents.send).toBeCalledWith('receiver-removed', receiver, [receiver])
      })
    })
  })
  describe('openStick', () => {
/* TODO
    beforeAll(() => {
      setup()
      jest.spyOn(GarminStick2.prototype, 'open').mockImplementation(function() {
        this.emit('startup')
      })
      jest.spyOn(scanner, 'add')
      scanner.openStick(GarminStick2)
    })
    afterAll(teardown)

    describe('it adds a new receiver on startup', () => {
      expect(scanner.add).toBeCalled()
    })

  */
  })
})
