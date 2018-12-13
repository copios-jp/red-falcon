import events from 'events'
const HOUR_MINUTES = 60
const MINUTE_SECONDS = 60
export const MAX_DURATION = HOUR_MINUTES * MINUTE_SECONDS

export default class Timer extends events.EventEmitter {

  interval = undefined

  startedAt = undefined

  getValue = () => {
    if(!this.startedAt) {
      return 0
    }
    return Math.round((new Date() - this.startedAt) / 1000)
  }

  reset = () => {
    this.startedAt = new Date()
    this.emit('tick', this.getValue())
  }

  tick = () => {
    const value = this.getValue()
    if(value > MAX_DURATION) {
      this.stop()
    } else {
      this.emit('tick', this.getValue())
    }
  }

  start = () => {
    this.startedAt = new Date()
    this.interval = setInterval(this.tick, 1000)
  }

  stop = () => {
    clearInterval(this.interval)
    delete this.interval
    delete this.startedAt

    this.emit('tick', this.getValue())
    this.removeAllListeners()
  }
}
