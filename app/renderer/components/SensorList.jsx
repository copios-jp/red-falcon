import * as React from 'react'
import { Component } from 'react'
import { ipcRenderer } from 'electron'

import { withStyles } from '@material-ui/core/styles'
import { GridList } from '@material-ui/core'
import styles from '../styles/'
import Sensor from './sensor/'

export class SensorList extends Component {
  state = {
    transmitters: [],
  }

  componentDidMount() {
    ipcRenderer.on('transmitter-added', this.onTransmitter)
    ipcRenderer.on('transmitter-removed', this.onTransmitter)
  }

  componentWillUnmount() {
    ipcRenderer.off('transmitter-added', this.onTransmitter)
    ipcRenderer.off('transmitter-removed', this.onTransmitter)
  }

  onTransmitter = (event, transmitter, transmitters) => {
    this.setState((state) => {
      return { ...state, transmitters }
    })
  }

  render() {
    const { classes } = this.props
    const { transmitters } = this.state
    const { length } = transmitters

    return (
      <GridList cellHeight={'auto'} padding={0} className={classes.gridList}>
        {transmitters.map((transmitter, index) => (
          <Sensor key={index} sensorClass={`sensor_${length}`} transmitter={transmitter} />
        ))}
      </GridList>
    )
  }
}

export default withStyles(styles)(SensorList)
