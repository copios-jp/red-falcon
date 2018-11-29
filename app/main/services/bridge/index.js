/*
 *
 * This object defines the bridge between main and renderer for handling:
 *
 * send:
 *   HeartRateTransmitter
 *     found
 *     data
 *
 * receive: addFakeTransmitter
 *
 */
import USBScanner from '../usb_scanner'

export default {
  activate(webContents) {
    USBScanner.on('receiver-added', (receiver, receivers) => {
      webContents.send('receiver-added', receiver, receivers)

      receiver.on('transmitter-added', (transmitter, transmitters) => {
        webContents.send('transmitter-added', transmitter, transmitters)

        transmitter.on('transmitter-data', (transmitter) => {
          webContents.send('transmitter-data', transmitter)
        })
      })

      receiver.on('transmitter-removed', (transmitter, transmitters) => {
        webContents.send('transmitter-removed', transmitter, transmitters)
      })
    })

    USBScanner.on('receiver-removed', (receiver, receivers) => {
      webContents.send('receiver-removed', receiver, receivers)
    })
    USBScanner.activate()
  },

  deactivate() {
    USBScanner.deactivate()
  },
}
