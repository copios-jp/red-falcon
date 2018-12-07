import * as React from 'react'
import { Component } from 'react'
import { DialogContent, TextField, InputAdornment } from '@material-ui/core'
import Coefficients from './Coefficients'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

class Form extends Component {
  state = {
    ...this.props.sensor.state,
  }

  propagateStateChange = (update) => {
    this.setState((state) => {
      return { ...state, ...update }
    })

    this.props.sensor.setState((state) => {
      return { ...state, ...update }
    })
  }

  handleAgeChange = (event) => {
    const age = parseInt(event.target.value) || 0
    this.propagateStateChange({ age })
  }

  handleNameChange = (event) => {
    const name = event.target.value || ''
    this.propagateStateChange({ name })
  }

  textField(handler, value, adornment, label) {
    const { classes } = this.props
    return (
      <TextField
        onChange={handler}
        className={classes.editTextField}
        variant="outlined"
        defaultValue={value ? value : ''}
        label={label}
        InputProps={{
          endAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
        }}
      />
    )
  }

  render() {
    return (
      <DialogContent>
        {this.textField(this.handleNameChange, this.state.name, '様', '名前')}
        {this.textField(this.handleAgeChange, this.state.age, '才', '年齢')}
        <Coefficients coefficients={this.state.zoneCoefficients} age={this.state.age} />
      </DialogContent>
    )
  }
}

export default withStyles(styles)(Form)
