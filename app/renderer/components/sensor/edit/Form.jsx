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

/*
export default withStyles(styles)((props) => {
  const { classes, sensor } = props
  const changeAge = (event) => {
    sensor.age = parseInt(event.target.value) || undefined
  }

  return (
    <DialogContent>
      <DialogContentText>{`御利用いただいている方の詳細を入力ください。`}</DialogContentText>
      <TextField
        onChange={changeAge}
        className={classes.editTextField}
        variant="outlined"
        defaultValue={sensor.age}
        label="年齢"
        InputProps={{
          endAdornment: <InputAdornment position="start">才</InputAdornment>,
        }}
      />
      <Divider />
      <div>心拍ゾーン</div>
      <Coefficients coefficients={sensor.zoneCoefficients} age={sensor.age} />
    </DialogContent>
  )
})
*/

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

  render() {
    const { classes } = this.props
    const { sensor } = this.state

    return (
      <DialogContent>
        <DialogContentText>{`御利用いただいている方の詳細を入力ください。`}</DialogContentText>
        <TextField
          onChange={this.handleNameChange}
          className={classes.editTextField}
          variant="outlined"
          defaultValue={sensor.name}
          label="名前"
          InputProps={{
            endAdornment: <InputAdornment position="start">様</InputAdornment>,
          }}
        />

        <TextField
          onChange={this.handleAgeChange}
          className={classes.editTextField}
          variant="outlined"
          defaultValue={sensor.age}
          label="年齢"
          InputProps={{
            endAdornment: <InputAdornment position="start">才</InputAdornment>,
          }}
        />
        <Divider />
        <Coefficients coefficients={sensor.zoneCoefficients} age={sensor.age} />
      </DialogContent>
    )
  }
}

export default withStyles(styles)(Form)
