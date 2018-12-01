import { MAX_HR, ZONE_LABELS } from '../../constants'

export const heartZoneFor = (age=0, coefficients=[], rate=0) => {
    const max = MAX_HR - age

    let index = 0
    // may do "SLACKING"
    let zoneName = ZONE_LABELS[index]
    let limit = coefficients[++index] * max

    while (limit < rate) {
      zoneName = ZONE_LABELS[index]
      limit = coefficients[++index] * max
    }
    return zoneName
}
