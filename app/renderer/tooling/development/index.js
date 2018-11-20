import { SensorsView } from '../../components/SensorsView'
import EventEmitter from 'events'

export default {
  apply() {

    SensorsView.prototype.addFakeChannel = function() {


      const channels = this.state.channels
      const id = Object.keys(channels).length++
        const channel = {
        channelId: id,
        sensor: Object.assign(new EventEmitter(), { detach() {}, channel: id }),
      }
      channel.sensor.once('hbData', (data) => {
        const state = { ...this.state }
        const channel = state.channels[id]
        channel.data = data
        this.setState(state)
      })
      channels[id] = channel
      this.setState(this.state)

      return channel
    }

    SensorsView.prototype.addFakeSensor = function() {
      let beat = 80
      const maxDelta = 5
      let direction = 1
      const channels = this.state.channels
      const channel = Object.values(channels).find((channel) => {
        return channel.data === undefined
      }) || this.addFakeChannel()

      const interval = window.setInterval(() => {
        if (beat > 160 || beat < 80) {
          direction = direction * -1
        }
        channel.sensor.emit('hbData', {
          ComputedHeartRate: (beat += direction * Math.floor(Math.random() * Math.floor(maxDelta))),
        })
      }, 500)

      const detach = channel.sensor.detach
      channel.sensor.detach = () => {
        detach.call(channel.sensor)
        window.clearInterval(interval)
      }
      if (this.stick === undefined) {
        this.stick = {
          close() {},
        }
      }
    }
  }
}
