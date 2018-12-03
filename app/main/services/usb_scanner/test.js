import { scanner } from './'
import { SCAN_INTERVAL, receivers } from './'
import Ant from 'ant-plus'

/*
   Ant.GarminStick2.mockImplementation(() => {})
   Ant.GarminStick3.mockImplementation(() => {})
*/
let receiver
let transmitter
let webContents

const setup = () => {
  webContents = {
    send: jest.fn(),
  }

  receiver = helpers.apiMember({})
  transmitter = helpers.apiMember({})

  jest.spyOn(scanner, 'on')
  jest.spyOn(scanner, 'add')
  jest.spyOn(scanner, 'emit')
  jest.spyOn(scanner, 'startScanning')
  jest.spyOn(scanner, 'stopScanning')
  jest.spyOn(scanner, 'remove')
  scanner.activate(webContents)
}

jest.useFakeTimers()

const teardown = () => {
  receiver.mockRestore()
  transmitter.mockRestore()
  ;[...receivers].forEach((receiver, index) => {
    receivers.splice(index, 1)
  })

  scanner.on.mockRestore()
  scanner.add.mockRestore()
  scanner.emit.mockRestore()
  scanner.startScanning.mockRestore()
  scanner.stopScanning.mockRestore()
  scanner.remove.mockRestore()
  scanner.deactivate()

  webContents.send.mockRestore()
}

describe('scanner', () => {
  describe('activate', () => {
    beforeAll(setup)
    afterAll(teardown)

    it('emits scanner-activated', () => {
      expect(scanner.emit).toBeCalledWith('scanner-activated', scanner)
    })

    it('starts scanning', () => {
      expect(scanner.startScanning).toBeCalled()
    })
  })

  describe('add', () => {
    beforeAll(() => {
      setup()
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

  describe('cleanReceivers', () => {
    const knownReceiver = helpers.apiMember({})
    beforeAll(() => {
      setup()
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
      receivers.push(receiver)
      receivers.push(knownReceiver)
      scanner.cleanReceivers()
    })
    afterAll(() => {
      scanner.getDevices.mockRestore()
      teardown()
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
    beforeAll(() => {
      setup()
      receivers.push(receiver)
      scanner.deactivate()
    })
    afterAll(teardown)

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
    beforeAll(() => {
      jest.spyOn(Ant, 'getDeviceList').mockImplementation(() => [
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
      ])
    })
    afterAll(() => {
      Ant.getDeviceList.mockRestore()
    })
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
    const stick = function() {
      Object.assign(this, helpers.apiMember({}))
      this.open = () => {
        this.emit('startup')
      }
      this.setMaxListeners = () => {}
      this.device = {}
      this.close = () => {}
      this.reset = () => {}
    }

    beforeAll(() => {
      setup()
      scanner.openStick(stick)
    })
    afterAll(() => {
      stick.mockRestore()
      teardown()
    })

    it('adds the stick on startup', () => {
      expect(scanner.add).toBeCalled()
    })
  })

  describe('remove', () => {
    beforeAll(() => {
      setup()
      receivers.push(receiver)
      jest.spyOn(receivers, 'splice')
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

  describe('startScanning', () => {
    beforeAll(setup)
    afterAll(teardown)
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
      setup()
      id = scanner.intervalId
      scanner.stopScanning()
    })
    afterAll(teardown)
    it('clears the interval', () => {
      expect(clearInterval).toBeCalledWith(id)
      expect(scanner.intervalId).toEqual(undefined)
    })
  })
})
