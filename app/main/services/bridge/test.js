jest.mock('../usb_scanner')
import USBScanner from '../usb_scanner'

import Bridge from './'


const webContents = {
  send: jest.fn(),
}

const USBbus = {}
USBScanner.on.mockImplementation(helpers.onImplementation(USBbus))
USBScanner.emit.mockImplementation(helpers.emitImplementation(USBbus))

const transmitterBus = {}
const transmitter = {
  on: jest.fn(helpers.onImplementation(transmitterBus)),
  emit: jest.fn(helpers.emitImplementation(transmitterBus)),
}

const receiverBus = {}
const receiver = {
  on: jest.fn(helpers.onImplementation(receiverBus)),
  emit: jest.fn(helpers.emitImplementation(receiverBus)),
}

describe('bridge', () => {
  describe('activate', () => {
    beforeAll(() => {
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
    beforeAll(() => {
      Bridge.deactivate()
    })

    it('delegates to USBScanner', () => {
      expect(USBScanner.deactivate).toBeCalled()
    })
  })

  describe('receiver-added', () => {
    beforeAll(() => {
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
    beforeAll(() => {
      Bridge.activate(webContents)
      USBScanner.emit('receiver-removed', receiver, [receiver])
    })

    it('sends receiver-removed to webContents', () => {
      expect(webContents.send).toBeCalledWith('receiver-removed', receiver, [receiver])
    })
  })

  describe('transmitter-added', () => {
    beforeAll(() => {
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
    beforeAll(() => {
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
    beforeAll(() => {
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
