import Ant from './'
import events from 'events'
import Receiver from './Receiver'
import { isAntPlusReceiver, unknownReceivers } from './filters'

export const SCAN_INTERVAL = 5000

export const receivers = []

class Scanner extends events.EventEmitter {
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

  clean = () => {
    const filter = unknownReceivers.bind(this.getDevices())
    receivers.filter(filter).forEach(this.remove)
  }

  deactivate = () => {
    ;[...receivers].forEach((receiver) => {
      this.remove(receiver)
    })
  }

  getDevices = () => {
    return Ant.getDeviceList().filter(isAntPlusReceiver)
  }

  newDevicesAvailable = () => {
    this.clean()
    return this.getDevices().length > receivers.length
  }

  openNewDevices = () => {
    if (this.newDevicesAvailable()) {
      this.sticks.forEach((Stick) => {
        this.open(new Stick())
      })
    }
  }

  open = (stick) => {
    stick.once('startup', () => {
      const receiver = new Receiver(stick)
      this.add(receiver)
      stick.once('shutdown', this.shutdown.bind(this, receiver))
    })
    try {
      if (!stick.open()) {
        stick.removeAllListeners('startup')
      }
    } catch (e) {
      stick.removeAllListeners('startup')
    }
  }

  remove = (receiver) => {
    receiver.deactivate()
  }

  shutdown = (receiver) => {
    this.stopScanning()
    receivers.splice(receivers.indexOf(receiver), 1)
    this.emit('receiver-removed', receiver, receivers)
    this.emit('scanner-deactivated', this)
  }

  startScanning = () => {
    this.openNewDevices()

    if (this.intervalId) {
      this.stopScanning()
    }

    this.intervalId = setInterval(this.openNewDevices, SCAN_INTERVAL)
  }

  sticks = [Ant.GarminStick2, Ant.GarminStick3]

  stopScanning = () => {
    clearInterval(this.intervalId)
    delete this.intervalId
  }
}

export default new Scanner()
