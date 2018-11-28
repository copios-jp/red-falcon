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
    USBScanner.on('receiver', (receiver, receivers) => {
      webContents.send('receiver', receiver, receivers)
      receiver.on('transmitter', (transmitter, transmitters) => {
        webContents.send('transmitter', transmitter, transmitters)
        transmitter.on('data-transmitted', (transmitter) => {
          webContents.send('data-transmitted', transmitter)
        })
      })
    })
    USBScanner.activate()
  },

  deactivate() {
    USBScanner.deactivate()
  },
}
