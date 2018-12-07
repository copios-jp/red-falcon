import events from 'events'
import Ant from './'
import Transmitter from './Transmitter'
import { inactiveFilter, MAX_INACTIVE_MS as MAX_MS } from './filters'

export const MAX_INACTIVE_MS = MAX_MS
export const SCAN_INTERVAL = MAX_MS + 1000
export const MAX_CHANNELS = 8
export const MAX_LISTENERS = MAX_CHANNELS * 2 // 8 channels with two reads each

export const channels = []
export const transmitters = []
export const pending = []
for (let i = 0; i < MAX_CHANNELS; i++) {
  channels.push(i)
}

class Receiver extends events.EventEmitter {
  constructor(stick) {
    super()
    stick.setMaxListeners(MAX_LISTENERS)
    this.stick = stick
  }

  activate = () => {
    this.emit('receiver-activated', this)
    this.openNewDevices()
  }

  add = (transmitter) => {
    transmitters.push(transmitter)
    transmitter.once('remove', this.remove)
    transmitter.on('data', (updatedTransmitter) => {
      this.emit('transmitter-data', updatedTransmitter, transmitters)
    })
    this.emit('transmitter-added', transmitter, transmitters)
    transmitter.activate()
  }

  clean = () => {
    ;[...transmitters].filter(inactiveFilter).forEach(this.remove)
  }

  deactivate = () => {
    ;[...transmitters].forEach((transmitter) => {
      this.remove(transmitter)
    })
    try {
      this.stick.close()
      // this.stick.reset()
    } catch (e) {
      if (this.stick) {
        this.stick.emit('shutdown')
      }
      /* noop */
    }
    this.emit('receiver-deactivated', this)
  }

  openNewDevices = () => {
    channels.forEach((channel) => {
      this.sensors.forEach((Sensor) => {
        this.open(new Sensor(this.stick), channel)
      })
    })
  }

  open = (sensor, channel) => {
    sensor.once('hbData', (data) => {
      const transmitter = new Transmitter(sensor)
      Object.assign(transmitter, data)
      this.add(transmitter)
    })
    sensor.attach(channel, 0)
  }

  remove = (transmitter) => {
    const index = transmitters.indexOf(transmitter)
    transmitter.deactivate()
    transmitters.splice(index, 1)
    this.emit('transmitter-removed', transmitter, transmitters)
  }

  sensors = [Ant.HeartRateSensor]
}

export default Receiver
