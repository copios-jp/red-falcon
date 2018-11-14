import * as React from 'react';
import { withStyles } from '@material-ui/core/styles'
import { GridList } from '@material-ui/core';
import styles from '../styles/'
import Sensor from './Sensor'

const SensorList = (props) => {
  const { channels, classes } = props
  return (
    <GridList
      cellHeight={'auto'}
      padding={0}
      className={classes.gridList}>
      {
        channels.map((channel, index) => (
          <Sensor key={index}
            sensorClass={`sensor_${channels.length}`}
            channel={channel}
          />
        ))
      }
    </GridList>
  )
}

export default withStyles(styles)(SensorList)

