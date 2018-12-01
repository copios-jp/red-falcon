import events from 'events'
import Ant from 'ant-plus'
import AntTransmitter from '../ant_transmitter/'

export const MAX_LISTENERS = 16 // 8 channels with two reads each

const transmitters = []

class AntReceiver extends events.EventEmitter {
  constructor(stick) {
    super()
    stick.setMaxListeners(MAX_LISTENERS)
    this.stick = stick
    this.maxChannels = stick.maxChannels
  }

  add = (transmitter) => {
    transmitters.push(transmitter)
    this.emit('transmitter-added', transmitter, transmitters)
    transmitter.activate()
  }

  remove = (transmitter) => {
    const index = transmitters.indexOf(transmitter)
    transmitter.deactivate()
    transmitters.splice(index, 1)
    this.emit('transmitter-removed', transmitter, transmitters)
  }

  activate = () => {
    if (this.isActive) {
      return
    }
    scan.bind(this)()
    this.isActive = true
  }

  deactivate = () => {
    if (!this.isActive) {
      return
    }
    ([...transmitters]).forEach((transmitter) => {
      this.remove(transmitter)
    })
    this.stick.removeAllListeners()
    try {
      this.stick.close()
      this.stick.reset()
    } catch(e) {
      console.log(e)
    }
    this.removeAllListeners()
    this.isActive = false
  }
}

const scan = function() {
  for (let id = 0; id < this.stick.maxChannels; id++) {
    const sensor = new Ant.HeartRateSensor(this.stick)
    const transmitter = new AntTransmitter(sensor, id)

    sensor.once('hbData', (data) => {
      Object.assign(transmitter, data)
      transmitter.once('remove', () => {
        this.remove(transmitter)
      })
      this.add(transmitter)
      transmitter.activate()
    })
    sensor.attach(id, 0)
  }
}

export default AntReceiver
