import { GarminStick2, GarminStick3, getDeviceList } from 'ant-plus'
import events from 'events'
import AntReceiver from '../ant_receiver/'
import { onReceiverAdded, onReceiverRemoved } from './handlers'
import { isAntPlusReceiver, unknownReceivers } from './filters'

export const SCAN_INTERVAL = 5000

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
    this.removeAllListeners()
  }

  remove = (receiver) => {
    const index = receivers.indexOf(receiver)
    receiver.deactivate()
    receivers.splice(index, 1)
    this.emit('receiver-removed', receiver, receivers)
  }

  scan = () => {
    const devices = getDeviceList().filter(isAntPlusReceiver)
    receivers.filter(unknownReceivers.bind({}, devices)).forEach(this.remove)

    if (devices.length <= receivers.length) {
      return
    }

    ;[GarminStick2, GarminStick3].forEach((Stick) => {
      const stick = new Stick()
      stick.once('startup', () => {
        this.add(new AntReceiver(stick))
      })
      stick.open()
    })
  }
}

export const scanner = new USBScanner()

export const bindTo = (webContents) => {
  scanner.on('receiver-added', onReceiverAdded(webContents))
  scanner.on('receiver-removed', onReceiverRemoved(webContents))
  return scanner
}

