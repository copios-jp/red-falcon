import Ant from './'
import scanner from './Scanner'
import Transmitter from './Transmitter'
import Receiver from './Receiver'

import { SCAN_INTERVAL, receivers } from './Scanner'
import { MAX_LISTENERS, transmitters } from './Receiver'

const stick = mockApiMember(
  {},
  {
    setMaxListeners: jest.fn(),
    close: jest.fn(),
    reset: jest.fn(),
  },
)

/*
 * I am including ALL specs which could load up 'usb' (directly or via ant-plus)
 * as it blows up.
 *
 */

jest.useFakeTimers()

describe('ant', () => {
  describe('Scanner', () => {
    describe('activate', () => {
      beforeAll(() => {
        jest.spyOn(scanner, 'emit')
        jest.spyOn(scanner, 'startScanning').mockImplementation()
        scanner.activate()
      })

      afterAll(() => {
        scanner.deactivate()
        scanner.emit.mockRestore()
        scanner.startScanning.mockRestore()
      })

      it('emits scanner-activated', () => {
        expect(scanner.emit).toBeCalledWith('scanner-activated', scanner)
      })

      it('starts scanning', () => {
        expect(scanner.startScanning).toBeCalled()
      })
    })

    describe('add', () => {
      let receiver
      beforeAll(() => {
        ;[...receivers].forEach(() => {
          receivers.shift()
        })
        receiver = mockApiMember({})
        jest.spyOn(scanner, 'emit').mockImplementation()
        jest.spyOn(receiver, 'once').mockImplementation()
        jest.spyOn(receiver, 'activate').mockImplementation()
        scanner.add(receiver)
      })
      afterAll(() => {
        scanner.emit.mockRestore()
        ;[...receivers].forEach(() => {
          receivers.shift()
        })
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

    describe('clean', () => {
      let receiver
      beforeAll(() => {
        const knownReceiver = mockApiMember({})
        receiver = mockApiMember({})

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

        jest.spyOn(scanner, 'remove').mockImplementation()
        receivers.push(receiver)
        receivers.push(knownReceiver)
        scanner.clean()
      })
      afterAll(() => {
        scanner.getDevices.mockRestore()
        scanner.remove.mockRestore()
        ;[...receivers].forEach(() => {
          receivers.shift()
        })
      })
      it('calls remove for unknown receivers', () => {
        expect(scanner.remove).toBeCalledWith(receiver, 0, [receiver])
      })
    })

    describe('deactivate', () => {
      const receiver = mockApiMember({})
      beforeAll(() => {
        receivers.push(receiver)
        jest.spyOn(scanner, 'remove')
        scanner.deactivate()
      })
      afterAll(() => {
        scanner.stopScanning.mockRestore()
        scanner.emit.mockRestore()
        scanner.remove.mockRestore()
        ;[...receivers].forEach(() => {
          receivers.shift()
        })
      })

      it('removes all receivers', () => {
        expect(scanner.remove).toBeCalledWith(receiver)
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
        ;[...receivers].forEach(() => {
          receivers.shift()
        })
      })
      it('only returns garmin devices', () => {
        expect(scanner.getDevices().length).toEqual(2)
      })
    })

    describe('newDevicesAvailable', () => {
      let devices = [{}]
      beforeAll(() => {
        jest.spyOn(scanner, 'getDevices').mockImplementation(() => devices)
        jest.spyOn(scanner, 'clean')
        scanner.newDevicesAvailable()
      })
      afterAll(() => {
        scanner.getDevices.mockRestore()
        scanner.cleanReceivers.mockRestore()
        ;[...receivers].forEach(() => {
          receivers.shift()
        })
      })

      it('cleans receivers so there are no unknown receivers', () => {
        expect(scanner.clean).toBeCalled()
      })

      it('is true when there are more devices than receivers', () => {
        devices = [{}, {}]
        expect(scanner.newDevicesAvailable()).toEqual(true)
      })
      it('is false when there are more devices than receivers', () => {
        devices = []
        expect(scanner.newDevicesAvailable()).toEqual(false)
      })
    })

    describe('openNewDevices', () => {
      let available
      beforeEach(() => {
        jest.spyOn(scanner, 'newDevicesAvailable').mockImplementation(() => available)
        jest.spyOn(scanner, 'open')
      })
      afterEach(() => {
        scanner.newDevicesAvailable.mockRestore()
        scanner.open.mockRestore()
      })

      it('calls open stick with each of our sticks when there is a device available', () => {
        available = true
        scanner.openNewDevices()
        expect(scanner.open.mock.calls[0][0]).toBeInstanceOf(scanner.sticks[0])
      })

      it('does not openStick when there are not devices available', () => {
        available = false
        scanner.openNewDevices()
        expect(scanner.open).not.toBeCalled()
      })
    })

    describe('open', () => {
      beforeAll(() => {
        stick.open = jest.fn(function() {
          this.emit('startup')
        })
        stick.setMaxListeners = jest.fn()

        jest.spyOn(scanner, 'add').mockImplementation(() => {})
        scanner.open(stick)
      })
      afterAll(() => {
        scanner.add.mockRestore()
        scanner.deactivate()
      })

      it('adds the stick on startup', () => {
        expect(scanner.add).toBeCalled()
        expect(scanner.add.mock.calls[0][0]).toBeInstanceOf(Receiver)
      })

      it('adds shutdown handling', () => {
        expect(stick.once.mock.calls[1][0]).toEqual('shutdown')
      })
    })

    describe('remove', () => {
      let receiver
      beforeAll(() => {
        receiver = new Receiver(stick)
        jest.spyOn(receiver, 'deactivate')
        scanner.remove(receiver)
      })
      it('deactivates the receiver', () => {
        expect(receiver.deactivate).toBeCalled()
      })
    })

    describe('shutdown', () => {
      const receiver = mockApiMember()
      beforeAll(() => {
        jest.spyOn(scanner, 'emit')
        jest.spyOn(scanner, 'stopScanning')
        jest.spyOn(receivers, 'splice')
        receivers.push(receiver)
        scanner.shutdown(receiver)
      })
      afterAll(() => {
        ;[...receivers].forEach(() => {
          receivers.shift()
        })
        scanner.emit.mockRestore()
        receivers.splice.mockRestore()
        receivers.stopScanning.mockRestore()
      })

      it('stops scanning', () => {
        expect(scanner.stopScanning).toBeCalled()
      })

      it('splices out the reciever', () => {
        expect(receivers.splice).toBeCalledWith(0, 1)
      })

      it('emits receiver-removed', () => {
        expect(scanner.emit).toBeCalledWith('receiver-removed', receiver, receivers)
      })

      it('emits scanner-deactivated', () => {
        expect(scanner.emit).toBeCalledWith('scanner-deactivated', scanner)
      })
    })

    describe('startScanning', () => {
      beforeAll(() => {
        jest.spyOn(scanner, 'stopScanning').mockImplementation()
        jest.spyOn(scanner, 'openNewDevices').mockImplementation()
        scanner.startScanning()
      })
      afterAll(() => {
        scanner.stopScanning.mockRestore()
        scanner.openNewDevices.mockRestore()
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
  describe('Receiver', () => {
    describe('constructor', () => {
      let receiver
      beforeAll(() => {
        jest.spyOn(stick, 'setMaxListeners')
        receiver = new Receiver(stick)
      })
      it('sets max listeners on the stick', () => {
        expect(stick.setMaxListeners).toBeCalledWith(MAX_LISTENERS)
      })

      it('stores the stick', () => {
        expect(receiver.stick).toEqual(stick)
      })
    })

    describe('activate', () => {
      let stick
      let receiver

      beforeAll(() => {
        stick = mockApiMember({}, { setMaxListeners: jest.fn() })
        receiver = new Receiver(stick)
        jest.spyOn(receiver, 'emit')
        jest.spyOn(receiver, 'openNewDevices').mockImplementation(() => {})

        receiver.activate()
        receiver.deactivate()
      })
      it('emits receiver-activated', () => {
        expect(receiver.emit).toBeCalledWith('receiver-activated', receiver)
      })
      it('kicks scan', () => {
        expect(receiver.openNewDevices).toBeCalled()
      })
    })

    describe('add', () => {
      let transmitter
      let receiver
      beforeAll(() => {
        const stick = mockApiMember({}, { setMaxListeners: jest.fn() })
        transmitter = mockApiMember()
        receiver = new Receiver(stick)
        jest.spyOn(receiver, 'emit')
        receiver.add(transmitter)
      })

      afterAll(() => {
        receiver.emit.mockRestore()
        receiver.deactivate()
      })

      it('adds the transmitter', () => {
        expect(transmitters.includes(transmitter)).toEqual(true)
      })

      it('adds remove once', () => {
        expect(transmitter.once).toBeCalledWith('remove', receiver.remove)
      })

      it('emits transmitter-added once', () => {
        expect(receiver.emit).toBeCalledWith('transmitter-added', transmitter, transmitters)
      })

      it('activates the transmitter', () => {
        expect(transmitter.activate).toBeCalled()
      })
    })

    describe('deactivate', () => {
      let transmitter
      let receiver
      beforeAll(() => {
        transmitter = mockApiMember({})
        receiver = new Receiver(stick)
        jest.spyOn(receiver, 'emit')
        jest.spyOn(receiver, 'remove')
        receiver.add(transmitter)
        receiver.deactivate()
      })

      it('removes all transmitters', () => {
        expect(receiver.remove).toBeCalledWith(transmitter)
      })

      it('closes and resets the stick', () => {
        expect(stick.close).toBeCalled()
      })

      it('emits receiver-deactivated', () => {
        expect(receiver.emit).toBeCalledWith('receiver-deactivated', receiver)
      })
    })

    describe('openNewDevices', () => {
      let receiver
      let MockSensor
      let AnotherMockSensor
      beforeEach(() => {
        MockSensor = jest.fn()
        AnotherMockSensor = jest.fn()
        receiver = new Receiver(stick)
        receiver.sensors = [MockSensor, AnotherMockSensor]
        jest.spyOn(receiver, 'open').mockImplementation()
      })

      afterEach(() => {
        receiver.open.mockRestore()
      })

      it('calls open with our sensor when there is a device available', () => {
        receiver.openNewDevices()
        expect(MockSensor).toBeCalledWith(receiver.stick)
        expect(receiver.open.mock.calls[0][0]).toBeInstanceOf(MockSensor)
        expect(receiver.open.mock.calls[0][1]).toEqual(0)
        expect(receiver.open.mock.calls[1][0]).toBeInstanceOf(AnotherMockSensor)
        expect(receiver.open.mock.calls[1][1]).toEqual(0)

        expect(receiver.open.mock.calls[2][0]).toBeInstanceOf(MockSensor)
        expect(receiver.open.mock.calls[2][1]).toEqual(1)
        expect(receiver.open.mock.calls[3][0]).toBeInstanceOf(AnotherMockSensor)
        expect(receiver.open.mock.calls[3][1]).toEqual(1)
      })
    })

    describe('open', () => {
      let receiver
      let sensor
      const channel = 0
      beforeAll(() => {
        sensor = mockApiMember(
          {},
          {
            attach: jest.fn(function() {
              sensor.emit('hbData')
            }),
          },
        )
        receiver = new Receiver(stick)
        jest.spyOn(receiver, 'add').mockImplementation(() => {})
        receiver.open(sensor, channel)
      })
      afterAll(() => {
        receiver.add.mockRestore()
        receiver.deactivate()
      })

      it('adds the stick on startup', () => {
        expect(receiver.add).toBeCalled()
        expect(receiver.add.mock.calls[0][0]).toBeInstanceOf(Transmitter)
        expect(sensor.attach).toBeCalledWith(channel, 0)
      })
    })

    describe('remove', () => {
      const transmitter = mockApiMember({})
      let receiver
      beforeAll(() => {
        receiver = new Receiver(stick)
        transmitters.push(transmitter)
        jest.spyOn(receiver, 'emit')
        jest.spyOn(transmitters, 'splice')
        receiver.remove(transmitter)
      })
      afterAll(() => {
        receiver.emit.mockRestore()
        transmitter.splice.mockRestore()
        receiver.deactivate()
      })

      it('removes the transmitter', () => {
        expect(transmitters.length).toEqual(0)
      })

      it('deactivateis the transmitter', () => {
        expect(transmitter.deactivate).toBeCalled()
      })

      it('emits transmitter-removed', () => {
        expect(receiver.emit).toBeCalledWith('transmitter-removed', transmitter, transmitters)
      })
    })

    describe('sensors', () => {
      expect(new Receiver(stick).sensors).toEqual([Ant.HeartRateSensor])
    })
  })

  describe('Transmitter', () => {
    const sensor = mockApiMember({}, { detach: jest.fn() })
    const transmitter = new Transmitter(sensor)
    describe('constructor', () => {
      it('constructor', () => {
        expect(transmitter.sensor).toEqual(sensor)
      })
    })
    describe('activate', () => {
      beforeAll(() => {
        transmitter.activate()
      })
      afterAll(() => {
        transmitter.deactivate()
      })

      it('binds on hbData for sensor', () => {
        expect(transmitter.sensor.on).toBeCalledWith('hbData', transmitter.onHbData)
      })
    })

    describe('deactivate', () => {
      beforeAll(() => {
        jest.spyOn(transmitter, 'removeAllListeners')
        transmitter.deactivate()
      })

      afterAll(() => {
        transmitter.removeAllListeners.mockRestore()
      })

      it('removes all listeners', () => {
        expect(transmitter.removeAllListeners).toBeCalled()
      })

      it('removes all listeners from the sensor', () => {
        expect(transmitter.sensor.removeAllListeners).toBeCalled()
      })

      it('detaches the sensor', () => {
        expect(transmitter.sensor.detach).toBeCalled()
      })
    })

    describe('remove', () => {
      beforeAll(() => {
        jest.spyOn(transmitter, 'emit')
        transmitter.remove()
      })

      afterAll(() => {
        transmitter.emit.mockRestore()
      })

      it('emits remove', () => {
        expect(transmitter.emit).toBeCalledWith('remove', transmitter)
      })
    })
  })
})
