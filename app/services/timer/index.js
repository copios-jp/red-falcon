import events from 'events'
import NanoTimer from 'nanotimer'

const HOUR_MINUTES = 60
const MINUTE_SECONDS = 60
export const MAX_DURATION = HOUR_MINUTES * MINUTE_SECONDS

export default class Timer extends events.EventEmitter {
  timer = new NanoTimer()

  value = 0

  reset = () => {
    this.value = 0
    this.emit('tick', this.value)
  }

  tick = () => {
    this.value++

    if (this.value > MAX_DURATION) {
      this.stop()
    } else {
      this.emit('tick', this.value)
    }
  }

  start = () => {
    this.timer.setInterval(this.tick, '', '1s')
  }

  stop = () => {
    this.timer.clearInterval()
    this.value = 0
    this.emit('tick', this.value)
    this.removeAllListeners()
  }
}
