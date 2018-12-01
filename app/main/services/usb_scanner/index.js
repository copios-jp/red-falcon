import usb from 'usb'
import Ant from 'ant-plus'
import events from 'events'
import AntReceiver from '../ant_receiver/'

export const SCAN_INTERVAL = 5000
export const VENDOR_IDS = [0x0fcf]
export const PRODUCT_IDS = [0x1008, 0x1009]

export const isAntPlusReceiver = (device) => {
  const { idVendor, idProduct } = device.deviceDescriptor
  return VENDOR_IDS.includes(idVendor) && PRODUCT_IDS.includes(idProduct)
}

export const unknownReceivers = (devices, receiver) => {
  const exists = devices.find((device) => {
    const { busNumber, deviceAddress } = receiver.stick.device
    return device.busNumber === busNumber && device.deviceAddress === deviceAddress
  })
  return !exists
}

export const receivers = []

class USBScanner extends events.EventEmitter {
  activate = () => {
    if (this.isActive) {
      return
    }
    this.scan()
    this.intervalId = setInterval(this.scan, SCAN_INTERVAL)
    this.isActive = true
  }

  add = (receiver) => {
    receivers.push(receiver)
    receiver.once('remove', this.remove)
    this.emit('receiver-added', receiver, receivers)
    receiver.activate()
  }

  deactivate = () => {
    if (!this.isActive) {
      return
    }
    ;[...receivers].forEach((receiver) => {
      this.remove(receiver)
    })
    clearInterval(this.intervalId)
    this.isActive = false
  }

  remove = (receiver) => {
    const index = receivers.indexOf(receiver)
    receiver.deactivate()
    receivers.splice(index, 1)
    this.emit('receiver-removed', receiver, receivers)
  }

  scan = () => {
    const devices = usb.getDeviceList().filter(isAntPlusReceiver)
    receivers.filter(unknownReceivers.bind({}, devices)).forEach(this.remove)

    if (devices.length <= receivers.length) {
      return
    }

    ;[Ant.GarminStick2, Ant.GarminStick3].forEach((Stick) => {
      const stick = new Stick()
      stick.once('startup', () => {
        this.add(new AntReceiver(stick))
      })
      stick.open()
    })
  }
}

const scanner = new USBScanner()
export default scanner
