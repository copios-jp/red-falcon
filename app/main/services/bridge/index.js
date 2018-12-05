export const onTransmitterData = (webContents) => {
  return (transmitter) => {
    webContents.send('transmitter-data', transmitter)
  }
}

export const onTransmitterAdded = (webContents) => {
  return (transmitter, transmitters) => {
    webContents.send('transmitter-added', transmitter, transmitters)
    transmitter.on('transmitter-data', onTransmitterData(webContents))
  }
}

export const onTransmitterRemoved = (webContents) => {
  return (transmitter, transmitters) => {
    webContents.send('transmitter-removed', transmitter, transmitters)
  }
}

export const onReceiverAdded = (webContents) => {
  return (receiver, receivers) => {
    webContents.send('receiver-added', receiver, receivers)
    receiver.on('transmitter-added', onTransmitterAdded(webContents))
    receiver.on('transmitter-removed', onTransmitterRemoved(webContents))
  }
}

export const onReceiverRemoved = (webContents) => {
  return (receiver, receivers) => {
    webContents.send('receiver-removed', receiver, receivers)
  }
}

export default (scanner, webContents) => {
  scanner.on('scanner-activated', () => {
    scanner.on('receiver-added', onReceiverAdded(webContents))
    scanner.on('receiver-removed', onReceiverRemoved(webContents))
  })
  scanner.on('scanner-deactivated', () => {
    scanner.removeAllListeners('receiver-added')
    scanner.removeAllListeners('receiver-removed')
  })
}
