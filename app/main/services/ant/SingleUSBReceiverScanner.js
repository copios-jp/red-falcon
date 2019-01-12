import events from 'events'

import Ant from './'
import Receiver from './Receiver'

class Scanner extends events.EventEmitter {
  activate = () => {
    const stick = new Ant.GarminStick2(1)
    stick.once('startup', this.onStartup.bind(this, stick))
    stick.open()
  }

  deactivate = () => {
    if (this.receiver) {
      this.receiver.deactivate()
      this.emit('receiver-removed', this.receiver, [])
      delete this.receiver
    }

    this.emit('scanner-deactivated', this)
  }

  onStartup = (stick) => {
    this.emit('scanner-activated', this)
    this.receiver = new Receiver(stick)
    this.emit('receiver-added', this.receiver, [this.receiver])
    this.receiver.activate()
  }
}

export default new Scanner()
