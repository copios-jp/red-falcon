import * as React from 'react'
import { IconButton } from '@material-ui/core'

import { Add } from '@material-ui/icons'

import { SensorsView } from '../../components/SensorsView'
import EventEmitter from 'events'

const addFakeChannel = function() {
  const channels = this.state.channels
  const id = Object.keys(channels).length++
  const channel = {
    channelId: id,
    sensor: Object.assign(new EventEmitter(), { detach() {}, channel: id }),
  }
  this.bindSensor(channel.sensor, id)
  channels[id] = channel
  this.setState(this.state)

  return channel
}

const nextBeat = (beat) => {
  const maxDelta = 5
  let direction = 1
  if (beat > 160 || beat < 80) {
    direction = direction * -1
  }
  return beat + direction * Math.floor(Math.random() * Math.floor(maxDelta))
}

const addFakeSensor = function() {
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

export default {
  apply() {
    SensorsView.prototype.addFakeChannel = addFakeChannel
    SensorsView.prototype.addFakeSensor = addFakeSensor
  },

  topBar(add) {
    return (
      <IconButton color="inherit" aria-label="Menu" onClick={add}>
        <Add />
      </IconButton>
    )
  },
}
