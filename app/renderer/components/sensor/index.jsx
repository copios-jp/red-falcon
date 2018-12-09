// import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { GridListTile, GridListTileBar, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'

import ActivityIndicator from './activity_indicator/'

import { getZone, getPercentageOfMax, FOX } from '../../services/analytics/'

import bind from '../../helpers/bind'

import styles from '../../styles/'

const DEFAULT_ZONE_COEFFICIENTS = [0, 0.5, 0.6, 0.7, 0.8, 0.9]
const DEFAULT_AGE = 35
const DEFAULT_WEIGHT = 70
const DEFAULT_RATE = 60

export const MALE = 'male'
export const FEMALE = 'female'

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
    const update = { transmitters }
    if (transmitter.sensor.channel === this.state.channel) {
      update.rate = transmitter.ComputedHeartRate
    }
    this.setState((state) => {
      return { ...state, ...update }
    })
  }

  onClick = () => {
    this.props.onClick(this)
  }

  render() {
    const { classes } = this.props
    const { channel, name, rate } = this.state
    const zoneClass = `rate_${getZone(this.state)}`
    return (
      <Paper
        onClick={this.onClick}
        elevation={4}
        className={classNames(
          classes.gridListItem,
          classes.sensor,
          classes[this.props.sensorClass],
        )}>
        <GridListTile>
          <GridListTileBar
            className={classes.gridTileBar}
            title={`${getPercentageOfMax(this.state)}%`}
          />
          <ActivityIndicator channel={channel} />
          <Typography className={classes.userName}>{name}&nbsp;</Typography>
          <div className={classNames(classes[this.props.sensorClass], classes[zoneClass])}>
            {rate}
          </div>
        </GridListTile>
      </Paper>
    )
  }

  state = {
    channel: this.props.channel,
    name: '',
    method: FOX,
    sex: MALE,
    coefficients: [].concat(DEFAULT_ZONE_COEFFICIENTS),
    age: DEFAULT_AGE,
    weight: DEFAULT_WEIGHT,
    rate: DEFAULT_RATE,
  }
}

export default withStyles(styles)(Sensor)
