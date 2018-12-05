import * as React from 'react'
import { Component } from 'react'
import {
  DialogContent,
  Divider,
  DialogContentText,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import Coefficients from './Coefficients'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

class Form extends Component {
  state = {
    sensor: this.props.sensor,
  }

  handleAgeChange = (event) => {
    const { sensor } = this.state
    const age = parseInt(event.target.value) || 0
    sensor.age = age
    this.props.sensor.age = age
    this.setState((state) => {
      return { ...state, sensor }
    })
  }

  handleNameChange = (event) => {
    const name = event.target.value || ''
    this.props.sensor.name = name
  }

  textField(handler, value, adornment, label) {
    const { classes } = this.props
    return (
      <TextField
        onChange={handler}
        className={classes.editTextField}
        variant="outlined"
        defaultValue={value}
        label={label}
        InputProps={{
          endAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
        }}
      />
    )
  }

  render() {
    const { sensor } = this.state
    return (
      <DialogContent>
        <DialogContentText>{`御利用いただいている方の詳細を入力ください。`}</DialogContentText>
        {this.textField(this.handleNameChange, sensor.name, '様', '名前')}
        {this.textField(this.handleAgeChange, sensor.age, '才', '年齢')}
        <Divider />
        <Coefficients coefficients={sensor.zoneCoefficients} age={sensor.age} />
      </DialogContent>
    )
  }
}

export default withStyles(styles)(Form)
