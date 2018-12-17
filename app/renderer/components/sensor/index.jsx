import _ from 'underscore'
import * as React from 'react'
import { Card } from '@material-ui/core'
import { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Header from './header/'
import Body from './body/'
import Footer from './footer/'

import { FOX } from '../../../services/analytics/'
import { UNKNOWN } from '../../../services/analytics/CalorieBurnPerHourCalculators'

import { snapshot } from '../../../services/analytics/'
import styles from '../../styles/'
import bind from '../../helpers/bind'

export const DEFAULT_ZONE_COEFFICIENTS = [0, 0.5, 0.6, 0.7, 0.8, 0.9]
export const DEFAULT_AGE = 35
export const DEFAULT_WEIGHT = 70
export const DEFAULT_RATE = 60
export const INACTIVE_TIMEOUT = 1000

export class Sensor extends Component {
  componentDidMount() {
    bind.call(this, 'on')
  }

  componentWillUnmount() {
    bind.call(this, 'off')
    this.expire.cancel()
  }

  expire = _.debounce(
    () => this.setState((state) => ({ ...state, active: false })),
    INACTIVE_TIMEOUT,
  )

  mainEvents = {
    onTransmitterData: ['transmitter-data'],
  }

  onClick = () => {
    this.props.onClick(this)
  }

  onTransmitterData = (event, transmitter) => {
    const {
      ComputedHeartRate,
      sensor: { channel },
    } = transmitter

    if (channel === this.props.channel) {
      this.setState((state) => ({ ...state, rate: ComputedHeartRate, active: true }))
      this.expire()
    }
  }

  recordSnapshot = () => {
    const history = this.state.history
    history.push(snapshot(this.state))
    this.handleChange({ history })
  }

  handleChange = (value) => {
    this.setState((state) => ({ ...state, ...value }))
  }

  render() {
    const { classes, cardClass } = this.props
    const className = [classes.sensorCard, classes[cardClass]].join(' ')
    return (
      <Card elevation={5} square={true} className={className} onClick={this.onClick}>
        <Header
          sensor={this.state}
          handleChange={this.handleChange}
          recordSnapshot={this.recordSnapshot}
        />
        <Body sensor={this.state} />
        <Footer sensor={this.state} />
      </Card>
    )
  }

  state = {
    active: true,
    recording: false,
    history: [],
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
