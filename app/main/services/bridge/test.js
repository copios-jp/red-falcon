jest.mock('../usb_scanner')
jest.mock('usb')
import Bridge from './'
import USBScanner from '../usb_scanner'

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

const webContents = {
  send: jest.fn(),
}

const USBbus = {}
USBScanner.on.mockImplementation(onImplementation(USBbus))
USBScanner.emit.mockImplementation(emitImplementation(USBbus))

const transmitterBus = {}
const transmitter = {
  on: jest.fn(onImplementation(transmitterBus)),
  emit: jest.fn(emitImplementation(transmitterBus)),
}

const receiverBus = {}
const receiver = {
  on: jest.fn(onImplementation(receiverBus)),
  emit: jest.fn(emitImplementation(receiverBus)),
}

describe('bridge', () => {
  describe('activate', () => {
    beforeEach(() => {
      Bridge.activate(webContents)
    })

    it('activates USBScanner', () => {
      expect(USBScanner.activate).toBeCalled()
    })

    it('subscribes to receiver-added', () => {
      expect(USBScanner.on.mock.calls[0][0]).toEqual('receiver-added')
    })

    it('subscribes to receiver-removed', () => {
      expect(USBScanner.on.mock.calls[1][0]).toEqual('receiver-removed')
    })
  })

  describe('deactivate', () => {
    beforeEach(() => {
      Bridge.deactivate()
    })

    it('delegates to USBScanner', () => {
      expect(USBScanner.deactivate).toBeCalled()
    })
  })

  describe('receiver-added', () => {
    beforeEach(() => {
      Bridge.activate(webContents)
      USBScanner.emit('receiver-added', receiver, [receiver])
    })

    it('sends receiver-added to webContents', () => {
      expect(webContents.send).toBeCalledWith('receiver-added', receiver, [receiver])
    })

    it('subscribes to transmitter-added and transmitter-removed on the reciever', () => {
      expect(receiver.on.mock.calls[0][0]).toEqual('transmitter-added')
      expect(receiver.on.mock.calls[1][0]).toEqual('transmitter-removed')
    })
  })

  describe('receiver-removed', () => {
    beforeEach(() => {
      Bridge.activate(webContents)
      USBScanner.emit('receiver-removed', receiver, [receiver])
    })

    it('sends receiver-removed to webContents', () => {
      expect(webContents.send).toBeCalledWith('receiver-removed', receiver, [receiver])
    })
  })

  describe('transmitter-added', () => {
    beforeEach(() => {
      Bridge.activate(webContents)
      USBScanner.emit('receiver-added', receiver, [receiver])
      receiver.emit('transmitter-added', transmitter, [transmitter])
    })

    it('sends transmitter-added to webContents', () => {
      expect(webContents.send).toBeCalledWith('transmitter-added', transmitter, [transmitter])
    })

    it('subscribes to transmitter-data on the transmitter', () => {
      expect(transmitter.on.mock.calls[0][0]).toEqual('transmitter-data')
    })
  })

  describe('transmitter-removed', () => {
    beforeEach(() => {
      Bridge.activate(webContents)
      USBScanner.emit('receiver-added', receiver, [receiver])
      receiver.emit('transmitter-removed', transmitter, [transmitter])
    })

    it('sends transmitter-removed to webContents', () => {
      expect(webContents.send).toBeCalledWith('transmitter-removed', transmitter, [transmitter])
    })
  })

  describe('transmitter-data', () => {
    const data = {}
    beforeEach(() => {
      Bridge.activate(webContents)
      USBScanner.emit('receiver-added', receiver, [receiver])
      receiver.emit('transmitter-added', transmitter, [transmitter])
      transmitter.emit('transmitter-data', data)
    })

    it('sends transmitter-data to webContents', () => {
      expect(webContents.send).toBeCalledWith('transmitter-data', data)
    })
  })
})
