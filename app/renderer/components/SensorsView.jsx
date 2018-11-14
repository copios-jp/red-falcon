import * as React from 'react';
import { Component } from 'react'

import { Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

import SensorList from './SensorList'
import TopBar from './TopBar'

import styles from '../styles/'

const usb = window['require']('usb')
const Ant = window['require']('ant-plus')

const ID_VENDOR = 0x0fcf;
const ID_PRODUCT = 0x1008;
const MAX_LISTENERS = 16 // 8 channels with two reads each
class SensorsView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activated: false,
      channels: {},
    }
  }

  activate() {
    if(this.state.activated) {
      return
    }

    usb.getDeviceList().forEach((device) => {
      const { deviceDescriptor } = device
      const { idVendor, idProduct } = deviceDescriptor
      if(idVendor === ID_VENDOR && idProduct === ID_PRODUCT) {
        const stick = new Ant.GarminStick2()

        stick.setMaxListeners(MAX_LISTENERS)
        stick.once('startup', () => {
          const state = {...this.state}
          state.maxChannels = stick.maxChannels
          for(let channelId = 0; channelId < stick.maxChannels; channelId++) {
            const sensor = new Ant.HeartRateSensor(stick)
            state.channels[channelId] = {
              sensor,
              channelId,
            }
            sensor.once('hbData', (data) => {
              const state = {...this.state}
              const channel = state.channels[channelId]
              channel.data = data
              this.setState(state)
            })
            sensor.attach(channelId, 0)
          }
          this.setState(state)
        })

        if(!stick.open()) {
          console.log('oh shit')
          return
        }
        this.stick = stick
      }
    })
    this.setState({...this.state, activated: true})
  }

  deactivate() {
    if(!this.state.activated) {
      return false
    }
    Object.values(this.state.channels).forEach(channel => this.remove(channel))
  }

  toggleActivation() {
    if(this.state.activated) {
      this.deactivate()
    } else {
      this.activate()
    }
  }

  addFakeSensor() {
    const channel = Object.values(this.state.channels).find((channel) => {
      return channel.data === undefined
    })
    if(channel === undefined) {
      return
    }
    let beat = 80
    const maxDelta = 5
    let direction = 1
    const interval =  window.setInterval(() => {
      if(beat > 160 || beat < 80) {
        direction = direction *  -1
      }
      channel.sensor.emit('hbData', {
        ComputedHeartRate: beat+=direction * Math.floor(Math.random() * Math.floor(maxDelta)),
      })
    }, 500)

    const detach = channel.sensor.detach
    channel.sensor.detach = () => {
      detach.call(channel.sensor)
      window.clearInterval(interval)
    }
  }

  remove(channel) {
    const sensor = channel.sensor
    sensor.detach()
    sensor.removeAllListeners()
    delete this.state.channels[sensor.channel]

    if(Object.keys(this.state.channels).length === 0) {
      this.stick.close()
      this.setState({...this.state, activated: false})
    } else {
      this.setState(this.state)
    }
  }

  getActiveChannels() {
    return Object.values(this.state.channels).filter(channel => channel.data)
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
    const add = this.addFakeSensor.bind(this)
    const full = this.isFull()

    return (
      <div className={classes.wrapper}>
        <TopBar activated={activated} toggle={toggle} add={add} full={full}/>
        <Paper className={classes.content} >
          <SensorList channels={channels} activated={activated}/>
          <Typography variant='caption' className={classes.copyright}>&copy; COPIOS</Typography>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(SensorsView)
