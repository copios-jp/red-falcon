import { ipcRenderer } from 'electron'

const bind = function(action) {
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

const handler = (name) =>
  function(event, item, items) {
    this.setState((state) => {
      return { ...state, [name]: item, [`${name}s`]: items }
    })
  }

const handlers = {
  onReceiver: handler('receiver'),
  onTransmitter: handler('transmitter'),
}

export const bindTo = (receiver) => {
  const { componentDidMount, componentWillUnmount } = receiver

  receiver.componentDidMount = function() {
    bind.call(receiver, 'on')
    return componentDidMount && componentDidMount.call(this)
  }

  receiver.componentWillUnmount = function() {
    bind.call(receiver, 'off')
    return componentWillUnmount && componentWillUnmount.call(this)
  }
}

export default bind
