import * as React from 'react'
import { Component } from 'react'
import { Paper, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import SensorList from './SensorList'
import TopBar from './TopBar'

import styles from '../styles/'

const usb = window['require']('usb')
const Ant = window['require']('ant-plus')

const ID_VENDOR = 0x0fcf
const ID_PRODUCT = 0x1008
const MAX_LISTENERS = 16 // 8 channels with two reads each
export class SensorsView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activated: false,
      channels: {},
    }
  }

  bindSensor(sensor, id) {
    sensor.once('hbData', (data) => {
      const state = { ...this.state }
      const channel = state.channels[id]
      channel.data = data
      this.setState(state)
    })
  }

  makeSensors() {
    const state = { ...this.state }
    state.maxChannels = this.stick.maxChannels
    for (let id = 0; id < this.stick.maxChannels; id++) {
      const sensor = new Ant.HeartRateSensor(this.stick)
      this.bindSensor(sensor)
      sensor.attach(id, 0)
      state.channels[id] = {
        sensor,
        channelId: id,
      }
    }
    this.setState(state)
  }

  activate() {
    if (this.state.activated) {
      return
    }
    const usbDevices = usb.getDeviceList()

    usbDevices.forEach((device) => {
      const { deviceDescriptor } = device
      const { idVendor, idProduct } = deviceDescriptor
      if (idVendor === ID_VENDOR && idProduct === ID_PRODUCT) {
        this.stick = new Ant.GarminStick2()
        this.stick.setMaxListeners(MAX_LISTENERS)
        this.stick.once('startup', this.makeSensors.bind(this))
        if (!this.stick.open()) {
          console.log('oh shit')
          return
        }
      }
    })
    this.setState({ ...this.state, activated: true })
  }

  deactivate() {
    if (!this.state.activated) {
      return false
    }
    Object.values(this.state.channels).forEach((channel) => this.remove(channel))
  }

  toggleActivation() {
    if (this.state.activated) {
      this.deactivate()
    } else {
      this.activate()
    }
  }

  remove(channel) {
    const sensor = channel.sensor
    sensor.detach()
    sensor.removeAllListeners()
    delete this.state.channels[sensor.channel]

    if (Object.keys(this.state.channels).length === 0) {
      this.stick.close()
      this.setState({ ...this.state, activated: false })
    } else {
      this.setState(this.state)
    }
  }

  handleTopBarAddSensor = () => {
    this.addFakeSensor()
  }

  getActiveChannels() {
    return Object.values(this.state.channels).filter((channel) => channel.data)
  }

  isActivated() {
    return this.state.activated === true
  }

  isFull() {
    return this.state.maxChannels === this.getActiveChannels().length
  }

  render() {
    const { classes } = this.props
    const channels = this.getActiveChannels()
    const activated = this.isActivated()

    const toggle = this.toggleActivation.bind(this)
    const full = this.isFull()

    return (
      <div className={classes.wrapper}>
        <TopBar activated={activated} toggle={toggle} add={this.handleTopBarAddSensor} full={full} />
        <Paper className={classes.content}>
          <SensorList channels={channels} activated={activated} />
          <Typography variant="caption" className={classes.copyright}>
            &copy; COPIOS
          </Typography>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(SensorsView)
