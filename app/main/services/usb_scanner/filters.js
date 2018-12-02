export const VENDOR_ID = 0x0fcf
export const VENDOR_IDS = [VENDOR_ID]

export const GARMIN_2 = 0x1008
export const GARMIN_3 = 0x1009

export const PRODUCT_IDS = [GARMIN_2, GARMIN_3]

export const isAntPlusReceiver = (device) => {
  const { idVendor, idProduct } = device.deviceDescriptor
  return VENDOR_IDS.includes(idVendor) && PRODUCT_IDS.includes(idProduct)
}

export const unknownReceivers = (devices, receiver) => {
  const exists = devices.find((device) => {
    const { busNumber, deviceAddress } = receiver.stick.device
    return device.busNumber === busNumber && device.deviceAddress === deviceAddress
  })
  return !exists
}
