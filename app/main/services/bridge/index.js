/*
 * This object defines the bridge between main and renderer
import { scanner } from '../usb_scanner'

const onTransmitterData = (webContents) => {
  return (transmitter) => {
    webContents.send('transmitter-data', transmitter)
  }
}

const onTransmitterAdded = (webContents) => {
  return (transmitter, transmitters) => {
    webContents.send('transmitter-added', transmitter, transmitters)
    transmitter.on('transmitter-data', onTransmitterData(webContents))
  }
}

const onTransmitterRemoved = (webContents) => {
  return (transmitter, transmitters) => {
    webContents.send('transmitter-removed', transmitter, transmitters)
  }
}

const onReceiverAdded = (webContents) => {
  return (receiver, receivers) => {
    webContents.send('receiver-added', receiver, receivers)
    receiver.on('transmitter-added', onTransmitterAdded(webContents))
    receiver.on('transmitter-removed', onTransmitterRemoved(webContents))
  }
}

const onReceiverRemoved = (webContents) => {
  return (receiver, receivers) => {
    webContents.send('receiver-removed', receiver, receivers)
  }
}

export default {
  activate(webContents) {
    scanner.on('receiver-added', onReceiverAdded(webContents))
    scanner.on('receiver-removed', onReceiverRemoved(webContents))
    scanner.activate()
  },

  deactivate() {
    scanner.deactivate()
  },
}
*/
