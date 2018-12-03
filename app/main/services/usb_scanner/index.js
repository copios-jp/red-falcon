import { GarminStick2, GarminStick3, getDeviceList } from 'ant-plus'
import events from 'events'
import AntReceiver from '../ant_receiver/'
import { isAntPlusReceiver, unknownReceivers } from './filters'

export const SCAN_INTERVAL = 5000

export const receivers = []

class USBScanner extends events.EventEmitter {
  constructor() {
    super()
  }

  sticks = [GarminStick2, GarminStick3]

  activate = () => {
    this.emit('scanner-activated', this)
    this.startScanning()
  }

  add = (receiver) => {
    receivers.push(receiver)
    receiver.once('remove', this.remove)
    this.emit('receiver-added', receiver, receivers)
    receiver.activate()
  }

  cleanReceivers = () => {
    const devices = this.getDevices()
    receivers.filter(unknownReceivers.bind({}, devices)).forEach(this.remove)
    return devices.length > receivers.length
  }

  deactivate = () => {
    this.stopScanning()
    ;[...receivers].forEach((receiver) => {
      this.remove(receiver)
    })
    this.emit('scanner-deactivated', this)
  }

  getDevices() {
    return getDeviceList().filter(isAntPlusReceiver)
  }

  newDevicesAvailable() {
    this.cleanReceivers()
    return this.getDevices().length > receivers.length
  }

  openNewDevices() {
    if (this.newDevicesAvailable()) {
      this.sticks.forEach(this.openStick)
    }
  }

  openStick = (Stick) => {
    const stick = new Stick()
    stick.once('startup', () => {
      this.add(new AntReceiver(stick))
    })
    stick.open()
  }

  remove = (receiver) => {
    const index = receivers.indexOf(receiver)
    receiver.deactivate()
    receivers.splice(index, 1)
    this.emit('receiver-removed', receiver, receivers)
  }

  startScanning = () => {
    this.openNewDevices()

    if(this.intervalId) {
      this.stopScanning()
    }

    this.intervalId = setInterval(this.openNewDevices, SCAN_INTERVAL)
  }

  stopScanning = () => {
    clearInterval(this.intervalId)
    delete this.intervalId
  }
}

export const scanner = new USBScanner()
