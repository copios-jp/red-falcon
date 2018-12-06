import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { GridList } from '@material-ui/core'
import Sensor from './sensor/'
import styles from '../styles/'
import bind from '../helpers/bind'

export class SensorList extends Component {
  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    bind.call(this, 'off')
  }

  mainEvents = {
    onTransmitter: ['transmitter-added' , 'transmitter-removed']
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

  state = {
    transmitters: [],
  }
}

export default withStyles(styles)(SensorList)
