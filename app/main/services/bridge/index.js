const emit = (...args) => {
  const webContents = args.shift()

  if (webContents.isDestroyed()) {
    return
  }

  webContents.send(...args)
}

export const onTransmitterData = (webContents) => {
  return (transmitter, transmitters) => {
    emit(webContents, 'transmitter-data', transmitter, transmitters)
    emit(webContents, 'transmitter:data', { transmitter, transmitters })
  }
}

export const onTransmitterAdded = (webContents) => {
  return (transmitter, transmitters) => {
    emit(webContents, 'transmitter-added', transmitter, transmitters)
    emit(webContents, 'transmitter:added', { transmitter, transmitters })
  }
}

export const onTransmitterRemoved = (webContents) => {
  return (transmitter, transmitters) => {
    emit(webContents, 'transmitter-removed', transmitter, transmitters)

    emit(webContents, 'transmitter:removed', { transmitter, transmitters })
  }
}

export const onReceiverAdded = (webContents) => {
  return (receiver, receivers) => {
    emit(webContents, 'receiver-added', receiver, receivers)
    emit(webContents, 'receiver:added', { receiver, receivers })

    receiver.on('transmitter-added', onTransmitterAdded(webContents))
    receiver.on('transmitter-removed', onTransmitterRemoved(webContents))
    receiver.on('transmitter-data', onTransmitterData(webContents))
  }
}

export const onReceiverRemoved = (webContents) => {
  return (receiver, receivers) => {
    emit(webContents, 'receiver-removed', receiver, receivers)
    emit(webContents, 'receiver:removed', { receiver, receivers })
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
