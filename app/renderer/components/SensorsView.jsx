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
      channels: {},
    }
  }

  createChannelFor = (sensor) => {
    const { channelId } = sensor
    const channel = {
      sensor,
      id: channelId,
    }

    sensor.once('hbData', (data) => {
      channel.data = data
      this.setState(this.state)
    })

    return channel
  }

  makeSensors = () => {
    const state = { ...this.state }
    state.maxChannels = this.stick.maxChannels
    for (let id = 0; id < this.stick.maxChannels; id++) {
      const sensor = new Ant.HeartRateSensor(this.stick)
      sensor.channelId = id
      state.channels[id] = this.createChannelFor(sensor)
      sensor.attach(id, 0)
    }
    this.setState(state)
  }

  activate = () => {
    if (this.isActivated()) {
      return
    }
    const usbDevices = usb.getDeviceList()

    usbDevices.forEach((device) => {
      const { deviceDescriptor } = device
      const { idVendor, idProduct } = deviceDescriptor
      if (idVendor === ID_VENDOR && idProduct === ID_PRODUCT) {
        this.stick = new Ant.GarminStick2()
        this.stick.setMaxListeners(MAX_LISTENERS)
        this.stick.once('startup', this.makeSensors)
        if (!this.stick.open()) {
          console.log('oh shit')
          return
        }
      }
    })
  }

  deactivate = () => {
    Object.values(this.state.channels).forEach(this.remove)
  }

  isActivated = () => {
    return Object.keys(this.state.channels).length > 0
  }

  toggleActivation = () => {
    const action = this.isActivated() ? this.deactivate : this.activate
    action()
  }

  remove = (channel) => {
    const sensor = channel.sensor
    sensor.detach()
    sensor.removeAllListeners()
    delete this.state.channels[channel.id]
    if (!this.isActivated()) {
      this.stick.close()
    }
    this.setState(this.state)
  }

  getActiveChannels() {
    return Object.values(this.state.channels).filter((channel) => channel.data)
  }

  isFull() {
    return this.state.maxChannels === this.getActiveChannels().length
  }

  render() {
    const { classes } = this.props
    const channels = this.getActiveChannels()
    const activated = this.isActivated()
    const add = this.addFakeSensor ? this.addFakeSensor.bind(this) : () => {}

    return (
      <div className={classes.wrapper}>
        <TopBar activated={activated} toggle={this.toggleActivation} add={add} />
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
