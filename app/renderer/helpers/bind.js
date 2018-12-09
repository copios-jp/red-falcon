import { ipcRenderer } from 'electron'

export default function(action) {
  Object.keys(this.mainEvents).forEach((handler) => {
    this.mainEvents[handler].forEach((event) => {
      let method
      try {
        if (this[handler] === undefined) {
          this[handler] = handlers[handler].bind(this)
        }
        method = this[handler]
      } catch (e) {
        throw `helpers#bind handler not defined', ${event}, ${handler}`
      }
      ipcRenderer[action](event, method)
    })
  })
}

const handlers = {
  onReceiver(event, receiver, receivers) {
    this.setState((state) => {
      return { ...state, receiver, receivers }
    })
  },

  onTransmitter(event, transmitter, transmitters) {
    this.setState((state) => {
      return { ...state, transmitter, transmitters }
    })
  },
}
