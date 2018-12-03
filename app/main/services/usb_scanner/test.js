import { scanner } from './'
import { SCAN_INTERVAL, receivers } from './'
import Ant from '../ant/'
import AntReceiver from '../ant_receiver/'

Ant.getDeviceList.mockImplementation(() => {
  return [
    {
    deviceDescriptor: {
      idVendor: 0x0fcf,
      idProduct: 0x1008,
    },
  },
  {
    deviceDescriptor: {
      idVendor: 0x0fcf,
      idProduct: 0x1009,
    },
  },
  {
    deviceDescriptor: {
      idVendor: 1234,
      idProduct: 1234,
    },
  },
  ]
})

jest.useFakeTimers()
jest.mock('../ant/')
jest.mock('../ant_receiver/', () => {
  return function() {
    this.activate = jest.fn()
    this.deactivate = jest.fn()
    this.once = jest.fn()
    this.emit = jest.fn()
  }
})

const Stick = function() {
  Object.assign(this, helpers.apiMember({}))
  this.open = () => {
    this.emit('startup')
  }
  this.setMaxListeners = () => {}
  this.device = {}
  this.close = () => {}
  this.reset = () => {}
}


describe('scanner', () => {
  describe('activate', () => {
    beforeAll(() => {
      jest.spyOn(scanner, 'emit')
      scanner.activate()
    })
    afterAll(() => {
      scanner.deactivate()
      scanner.emit.mockRestore()
    })

    it('emits scanner-activated', () => {
      expect(scanner.emit).toBeCalledWith('scanner-activated', scanner)
    })

    it('is scanning since it has intervalId', () => {
      expect(scanner.intervalId).not.toEqual(undefined)
    })
  })

  describe('add', () => {
    const receiver = new AntReceiver()
    beforeAll(() => {
      jest.spyOn(scanner, 'emit')
      scanner.add(receiver)
    })
    afterAll(() => {
      scanner.emit.mockRestore()
      scanner.deactivate()
    })

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

  describe('cleanReceivers', () => {
    const knownReceiver = helpers.apiMember({})
    const receiver = new AntReceiver()
    beforeAll(() => {
      knownReceiver.stick = {
        device: {
          busNumber: 1,
          deviceAddress: 1,
        },
      }
      receiver.stick = {
        device: {
          busNumber: 0,
          deviceAddress: 0,
        },
      }

      jest.spyOn(scanner, 'getDevices').mockImplementation(() => {
        return [{ busNumber: 1, deviceAddress: 1 }]
      })

      jest.spyOn(scanner, 'remove')
      receivers.push(receiver)
      receivers.push(knownReceiver)
      scanner.cleanReceivers()
    })
    afterAll(() => {
      scanner.getDevices.mockRestore()
      scanner.remove.mockRestore()
      scanner.deactivate()
    })
    it('removes unknown receivers', () => {
      expect(scanner.remove).toBeCalledWith(receiver, 0, [receiver])
    })

    it('does not remove known receivers', () => {
      expect(receivers.length).toEqual(1)
      expect(receivers[0].stick.device.busNumber).toEqual(1)
    })
  })

  describe('deactivate', () => {
    const receiver = new AntReceiver()
    beforeAll(() => {
      receivers.push(receiver)
      jest.spyOn(scanner, 'stopScanning')
      jest.spyOn(scanner, 'emit')
      jest.spyOn(scanner, 'remove')
      scanner.deactivate()
    })
    afterAll(() => {
      scanner.stopScanning.mockRestore()
      scanner.emit.mockRestore()
      scanner.remove.mockRestore()
    })

    it('stops scanning', () => {
      expect(scanner.stopScanning).toBeCalled()
    })

    it('removes all receivers', () => {
      expect(scanner.remove).toBeCalledWith(receiver)
    })

    it('emits scanner-activated', () => {
      expect(scanner.emit).toBeCalledWith('scanner-deactivated', scanner)
    })
  })

  describe('getDevices', () => {
    it('only returns garmin devices', () => {
      expect(scanner.getDevices().length).toEqual(2)
    })
  })

  describe('newDevicesAvailable', () => {
    let length
    beforeAll(() => {
      jest.spyOn(scanner, 'getDevices').mockImplementation(() => ({
        length,
      }))
      jest.spyOn(scanner, 'cleanReceivers')
      scanner.newDevicesAvailable()
    })
    afterAll(() => {
      scanner.getDevices.mockRestore()
      scanner.cleanReceivers.mockRestore()
    })

    it('cleans receivers so there are no unknown receivers', () => {
      expect(scanner.cleanReceivers).toBeCalled()
    })

    it('is true when there are more devices than receivers', () => {
      length = 1
      expect(scanner.newDevicesAvailable()).toEqual(true)
    })
    it('is false when there are more devices than receivers', () => {
      length = 0
      expect(scanner.newDevicesAvailable()).toEqual(false)
    })
  })

  describe('openNewDevices', () => {
    let available
    beforeEach(() => {
      jest.spyOn(scanner, 'newDevicesAvailable').mockImplementation(() => available)
      jest.spyOn(scanner, 'openStick')
    })
    afterEach(() => {
      scanner.newDevicesAvailable.mockRestore()
      scanner.openStick.mockRestore()
    })

    it('calls open stick with each of our sticks when there is a device available', () => {
      available = true
      scanner.openNewDevices()
      expect(scanner.openStick).toBeCalledWith(scanner.sticks[0], 0, scanner.sticks)
      expect(scanner.openStick).toBeCalledWith(scanner.sticks[1], 1, scanner.sticks)
    })

    it('does not openStick when there are not devices available', () => {
      available = false
      scanner.openNewDevices()
      expect(scanner.openStick).not.toBeCalled()
    })
  })

  describe('openStick', () => {
    beforeAll(() => {
      jest.spyOn(scanner, 'add')
      scanner.openStick(Stick)
    })
    afterAll(() => {
      scanner.add.mockRestore()
      scanner.deactivate()
    })

    it('adds the stick on startup', () => {
      expect(scanner.add).toBeCalled()
      expect(scanner.add.mock.calls[0][0]).toBeInstanceOf(AntReceiver)
    })
  })

  describe('remove', () => {
    const receiver = new AntReceiver()
    beforeAll(() => {
      receivers.push(receiver)
      jest.spyOn(receivers, 'splice')
      jest.spyOn(scanner, 'emit')
      scanner.remove(receivers[0])
    })
    afterAll(() => {
      receivers.splice.mockRestore()
      scanner.remove.mockRestore()
      scanner.emit.mockRestore()
    })

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

  describe('startScanning', () => {
    beforeAll(() => {
      jest.spyOn(scanner, 'stopScanning')
      scanner.startScanning()
    })
    afterAll(() => {
      scanner.deactivate()
      scanner.stopScanning.mockRestore()
    })

    it('sets the interval', () => {
      expect(setInterval).toBeCalledWith(scanner.openNewDevices, SCAN_INTERVAL)
    })
    it('stops scanning if it is already scanning', () => {
      scanner.startScanning()
      expect(scanner.stopScanning).toBeCalled()
      expect(setInterval).toBeCalledWith(scanner.openNewDevices, SCAN_INTERVAL)
    })
  })

  describe('stopScanning', () => {
    let id
    beforeAll(() => {
      id = scanner.intervalId
      scanner.stopScanning()
    })
    it('clears the interval', () => {
      expect(clearInterval).toBeCalledWith(id)
      expect(scanner.intervalId).toEqual(undefined)
    })
  })
})
