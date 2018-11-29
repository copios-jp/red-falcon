import events from 'events'

class AntTransmitter extends events.EventEmitter {
  constructor(sensor, channel) {
    super()
    this.sensor = sensor
    this.channel = channel
  }

  isActive = false

  activate = () => {
    if(this.isActive) {
      return
    }

    this.sensor.on('hbData', (data) => {
      Object.assign(this, data)
      this.emit('transmitter-data', this)
    })
    this.isActive = true
  }

  remove = () => {
    this.emit('remove', this)
  }

  deactivate = () => {
    if(!this.isActive) {
      return
    }
    this.sensor.removeAllListeners()
    this.sensor.detach()
    this.removeAllListeners()
    this.isActive = false
  }
}

export default AntTransmitter
