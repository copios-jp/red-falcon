import * as React from 'react'
import { IconButton } from '@material-ui/core'

import { Add } from '@material-ui/icons'

import { SensorsView } from '../../components/SensorsView'
import { addFakeChannel, addFakeSensor } from './sensors'

export default {
  apply() {
    SensorsView.prototype.addFakeChannel = addFakeChannel
    SensorsView.prototype.addFakeSensor = addFakeSensor
  },

  topBar(add) {
    return (
      <IconButton color="inherit" aria-label="Menu" onClick={add}>
        <Add />
      </IconButton>
    )
  },
}
