import * as React from 'react'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Card } from '@material-ui/core'
import Header from './header/'
import Body from './body/'
import Footer from './footer/'
import { FOX } from '../../../services/analytics/'
import { UNKNOWN } from '../../../services/analytics/CalorieBurnPerHourCalculators'
import _ from 'underscore'
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

  expire = _.debounce(() => this.setState((state) => ({ ...state, active: false })), 1000)

  isMyChannel(transmitter) {
    return transmitter.sensor.channel === this.props.channel
  }

  mainEvents = {
    onTransmitterData: ['transmitter-data'],
  }

  onClick = () => {
    this.props.onClick(this)
  }

  onTransmitterData = (event, transmitter) => {
    if (this.isMyChannel(transmitter) === false) {
      return
    }
    this.setState((state) => ({
      ...state,
      rate: transmitter.ComputedHeartRate,
      active: true,
    }))
    this.expire()
  }

  render() {
    const { classes, cardClass } = this.props
    const className = [classes.sensorCard, classes[cardClass]].join(' ')
    return (
      <Card elevation={5} square={true} className={className} onClick={this.onClick}>
        <Header sensor={this.state} />
        <Body sensor={this.state} />
        <Footer sensor={this.state} />
      </Card>
    )
  }

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
