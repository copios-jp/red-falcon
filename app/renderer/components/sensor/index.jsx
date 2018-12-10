import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { GridListTile, GridListTileBar, Paper, Typography } from '@material-ui/core'
import classNames from 'classnames'

import ActivityIndicator from './activity_indicator/'
/*
import { RadialGauge } from 'react-canvas-gauges'
<RadialGauge
            renderTo='canvas-id'
            width={300}
            height={300}
            units={`${getPercentageOfMax(this.state)}%`}
            minValue={0}
            startAngle={90}
            ticksAngle={180}
            valueBox={false}
            maxValue={100}
            majorTicks={[ "0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100" ]}
            minorTicks={2}
            strokeTicks={true}
            highlights={[
              { "from": 0, "to": 49, "color": "#000000" },
              { "from": 50, "to": 59, "color": "#0d47a1" },
              { "from": 60, "to": 69, "color": "#1b5e20" },
              { "from": 70, "to": 79, "color": "#f57f17" },
              { "from": 80, "to": 89, "color": "#fe6510" },
              { "from": 90, "to": 100, "color": "#fb71c1" },
            ]}
            colorPlate="transparent"
            borderShadowWidth={0}
            borders={false}
            needleType="arrow"
            needleWidth={2}
            needleCircleSize={7}
            needleCircleOuter={false}
            needleCircleInner={false}
            animationDuration={1500}
            value={getPercentageOfMax(this.state)}
            animationRule="linear"
                      ></RadialGauge>
                      */
import { getZone, getPercentageOfMax, FOX } from '../../../services/analytics/'
import { UNKNOWN } from '../../../services/analytics/CalorieBurnPerHourCalculators'

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

  isMyChannel(transmitter) {
    return transmitter.sensor.channel === this.props.channel
  }

  onTransmitterData = (event, transmitter) => {
    if (this.isMyChannel(transmitter) === false) {
      return
    }

    this.handleChange({ rate: transmitter.ComputedHeartRate })
  }

  onClick = () => {
    this.props.onClick(this)
  }

  handleChange = (update) => {
    this.setState((state) => {
      return { ...state, ...update }
    })
  }

  render() {
    const { classes } = this.props
    const { channel, name, rate, active } = this.state
    const zoneClass = `rate_${getZone(this.state)}`
    return (
      <GridListTile
        cols={this.props.grid}
        rows={this.props.grid}
        onClick={this.onClick}
        className={classNames(
          classes.gridListItem,
          classes.sensor,
          classes[this.props.sensorClass],
        )}>
        <ActivityIndicator channel={channel} active={active} handleChange={this.handleChange} />
        <GridListTileBar
          className={classes.userName}
          title={name}
          style={{top:0, position: 'relative'}}
        />
        <div className={classNames(classes[this.props.sensorClass], classes[zoneClass])}>
            {rate}
        </div>
        <GridListTileBar
          className={classes.gridTileBar}
          style={{bottom:0, position: 'relative'}}
          title={`${getPercentageOfMax(this.state)}%`}
        />
    </GridListTile>
    )
  }

  // <Typography className={classes.userName}>{name}&nbsp;</Typography>
  state = {
    active: true,
    channel: this.props.channel,
    name: '',
    method: FOX,
    sex: UNKNOWN,
    coefficients: [].concat(DEFAULT_ZONE_COEFFICIENTS),
    age: DEFAULT_AGE,
    weight: DEFAULT_WEIGHT,
    rate: DEFAULT_RATE,
  }
}

export default withStyles(styles)(Sensor)
