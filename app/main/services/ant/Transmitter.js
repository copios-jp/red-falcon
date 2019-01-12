import events from 'events'

class Transmitter extends events.EventEmitter {
  constructor(sensor) {
    super()
    this.sensor = sensor
    this.updated = new Date()
  }

  activate = () => {
    this.sensor.on('hbData', this.onHbData)
  }

  deactivate = () => {
    this.removeAllListeners()
    this.sensor.removeAllListeners()
    this.sensor.detach()
  }

  // TODO - make this a debounce that removes the
  // transmitter if no data for more than n seconds
  onHbData = (data) => {
    this.updated = new Date()
    Object.assign(this, data)
    this.emit('data', this)
  }

  remove = () => {
    this.emit('remove', this)
  }
}

export default Transmitter
