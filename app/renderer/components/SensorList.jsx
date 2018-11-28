import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { GridList } from '@material-ui/core'
import styles from '../styles/'
import Sensor from './sensor/'

// TODO - make this a class and bind in state via ipcRenderer.on(transmitter)
// which will give us an array of transmitters and the one being impacted
const SensorList = (props) => {
  const { channels, classes } = props

  return (
    <GridList cellHeight={'auto'} padding={0} className={classes.gridList}>
      {channels.map((channel, index) => (
        <Sensor key={index} sensorClass={`sensor_${channels.length}`} channel={channel} />
      ))}
    </GridList>
  )
}

export default withStyles(styles)(SensorList)
