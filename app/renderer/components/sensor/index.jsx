// import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { GridListTile } from '@material-ui/core'
import { GridListTileBar } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import classNames from 'classnames'
import ActivityIndicator from './activity_indicator/'
import { heartZoneFor } from '../../services/analytics'
import styles from '../../styles/'

import { DEFAULT_ZONE_COEFFICIENTS } from '../../../constants'

import bind from '../../helpers/bind'

class Sensor extends Component {
  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    bind.call(this, 'off')
  }

  mainEvents = {
    onTransmitterData: ['transmitter-data'],
  }

  onTransmitterData = (event, transmitter, transmitters) => {
    const update = { transmitter, transmitters }
    if (transmitter.sensor.channel !== this.state.transmitter.sensor.channel) {
      delete update.transmitter
    }
    this.setState((state) => {
      return { ...state, ...update }
    })
  }

  render() {
    const { classes } = this.props
    const { transmitter } = this.state
    const { ComputedHeartRate } = transmitter
    const zoneClass = `rate_${this.zoneLabel()}`
    const handleClick = () => {
      this.props.onClick(this)
    }
    return (
      <Paper
        onClick={handleClick}
        elevation={4}
        className={classNames(
          classes.gridListItem,
          classes.sensor,
          classes[this.props.sensorClass],
        )}>
        <GridListTile>
          <GridListTileBar
            className={classes.gridTileBar}
            title={`${Math.round((ComputedHeartRate / (220 - this.state.age)) * 100)}%`}
          />
          <ActivityIndicator transmitter={transmitter} />
          <Typography className={classes.userName}>{this.state.name}&nbsp;</Typography>
          <div className={classNames(classes[this.props.sensorClass], classes[zoneClass])}>
            {ComputedHeartRate}
          </div>
        </GridListTile>
      </Paper>
    )
  }

  state = {
    transmitter: this.props.transmitter,
    channel: this.props.transmitter.sensor.channel,
    age: 0,
    zoneCoefficients: [...DEFAULT_ZONE_COEFFICIENTS],
    name: '',
  }

  zoneLabel() {
    const { transmitter, zoneCoefficients, age } = this.state
    const { ComputedHeartRate } = transmitter
    return heartZoneFor(age, zoneCoefficients, ComputedHeartRate)
  }
}

export default withStyles(styles)(Sensor)
