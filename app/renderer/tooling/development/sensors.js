import EventEmitter from 'events'

export const addFakeChannel = function() {
  const channels = this.state.channels
  const id = Object.keys(channels).length

  const sensor = Object.assign(new EventEmitter(), { detach() {}, channelId: id })
  channels[id] = this.createChannelFor(sensor)

  return channels[id]
}

const nextBeat = (beat) => {
  const maxDelta = 5
  let direction = 1
  if (beat > 160 || beat < 80) {
    direction = direction * -1
  }
  return beat + direction * Math.floor(Math.random() * Math.floor(maxDelta))
}

export const addFakeSensor = function() {
  let beat = nextBeat(80)
  const channel =
    Object.values(this.state.channels).find((channel) => {
      return channel.data === undefined
    }) || this.addFakeChannel()

  const interval = window.setInterval(() => {
    beat = nextBeat(beat)
    channel.sensor.emit('hbData', {
      ComputedHeartRate: beat,
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
