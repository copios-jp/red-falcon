import events from 'events'

import Ant from './'
import Receiver from './Receiver'
import { isAntPlusReceiver, unknownReceivers } from './filters'

export const SCAN_INTERVAL = 5000

export const receivers = []

/*
 * This class is left here for future reference as I would prefer to be able
 * to run multiple USB receivers in order to allow more than eight active transmitters
 *
 * https://github.com/copios-jp/red-falcon/issues/21
 * I am not 100% sure, but it seems like sing the single usb receiver with changes
 * to the receiver which detaches all sensors seems to have resolved it.
 *
 * Client does not need more than eight transmitters right now so
 * I am going to defer working in this until there is funding.
 * */
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
        this.open(new Stick(1))
      })
    }
  }

  close(stick) {
    try {
      stick.close()
    } catch (err) {
      /* noop */
    }
  }

  open = (stick) => {
    stick.startupTimeout = 1
    stick.once('startup', () => {
      delete stick.startupTimeout
      const receiver = new Receiver(stick)
      this.add(receiver)
      stick.once('shutdown', this.shutdown.bind(this, receiver))
    })
    try {
      if (!stick.open()) {
        stick.removeAllListeners('startup')
        stick.reset()
      } else {
        setTimeout(() => {
          if (stick.startupTimeout) {
            this.close(stick)
          }
        }, 500)
      }
    } catch (e) {
      if (e.message !== "Cannot read property 'transfer' of undefined") {
        this.close(stick)
      }
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

  // Ant.GarminStick3 not currently supported
  // as I dont have one to test with
  sticks = [Ant.GarminStick2]

  stopScanning = () => {
    clearInterval(this.intervalId)
    delete this.intervalId
  }
}

export default new Scanner()
