// import usb from  'usb'
const SCAN_INTERVAL = 10000
import Ant from 'ant-plus'
import events from 'events'
import AntReceiver from '../ant_receiver/'

const scan = () => {
  const stick2 = new Ant.GarminStick2()
  stick2.once('startup', () => {
    devices.add(new AntReceiver(stick2))
  })
  stick2.open()

  const stick3 = new Ant.GarminStick3()
  stick3.once('startup', () => {
    devices.add(new AntReceiver(stick3))
  })
  stick3.open()
}

const receivers = []

class Devices extends events.EventEmitter {
  add(receiver) {
    receivers.push(receiver)
    receiver.once('remove', this.remove)
    this.emit('receiver-added', receiver, receivers)
    receiver.activate()
  }

  remove = (receiver) => {
    const index = receivers.indexOf(receiver)
    receiver.deactivate()
    receivers.splice(index, 1)
    this.emit('receiver-removed', receiver, receivers)
  }

  activate() {
    if (this.isActive) {
      return
    }
    scan()
    this.intervalId = setInterval(scan, SCAN_INTERVAL)
    this.isActive = true
  }

  deactivate() {
    if (!this.isActive) {
      return
    }


    ([...receivers]).forEach((receiver) => {
      this.remove(receiver)
    })

    clearInterval(this.intervalId)
    this.removeAllListeners()
    this.isActive = false
  }
}

const devices = new Devices()

export default devices
