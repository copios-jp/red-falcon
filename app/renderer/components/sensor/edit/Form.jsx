import * as React from 'react'
import { Component } from 'react'
import calculators from '../../../services/maxHeartRateCalculations'

import {
  Select,
  MenuItem,
  FormControl,
  Grid,
  OutlinedInput,
  InputLabel,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import Coefficients from './Coefficients'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

class Form extends Component {
  state = {
    ...this.props.sensor.state.analytics,
    value: 0,
  }

  propagateStateChange = (update) => {
    this.setState((state) => {
      const nextState = { ...state, ...update }
      this.props.sensor.setState((state) => {
        return { ...state, analytics: { ...nextState } }
      })
      return nextState
    })
  }

  handleAgeChange = (event) => {
    const age = parseInt(event.target.value) || ''
    const max = this.state.at(age) || this.state.max
    this.propagateStateChange({ age, max })
  }

  handleWeightChange = (event) => {
    const weight = parseInt(event.target.value) || ''
    this.propagateStateChange({ weight })
  }

  handleMaxChange = (event) => {
    const max = parseInt(event.target.value) || ''
    this.propagateStateChange({ max })
    this.state.setMethod('manual')
  }

  handleNameChange = (event) => {
    const name = event.target.value || ''
    this.propagateStateChange({ name })
  }

  handleMethodChange = (event) => {
    const method = event.target.value
    this.state.setMethod(method)
    const max = this.state.at(this.state.age) || this.state.max
    this.propagateStateChange({ method, max })
  }

  textField(handler, adornment, label, props) {
    const { classes } = this.props
    return (
      <TextField
        onChange={handler}
        className={classes.editTextField}
        variant="outlined"
        label={label}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          endAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
        }}
        {...props}
      />
    )
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  //
  //  Some kind of select box { Object.keys(calculators).forEach((calculator) => (
  //  <Option/>
  //  )

  render() {
    const { age, weight, name, max, method } = this.state
    const { classes } = this.props
    return (
      <div>
        <Grid container spacing={24} justify="space-between">
          <Grid item xs>
            {this.textField(this.handleNameChange, '様', '名前', { value: name ? name : '' })}
          </Grid>
          <Grid item xs>
            {this.textField(this.handleAgeChange, '才', '年齢', { value: age ? age : '' })}
          </Grid>

          <Grid item xs>
            {this.textField(this.handleWeightChange, 'Kg', '体重', {
              value: weight ? weight : '',
            })}
          </Grid>
        </Grid>
        <Grid container spacing={24}>
          <Grid item xs>
            <FormControl variant="outlined" className={classes.editTextField}>
              <InputLabel htmlFor="method">計算式</InputLabel>
              <Select
                value={method}
                onChange={this.handleMethodChange}
                input={<OutlinedInput labelWidth={45} name="method" notched={true} id="method" />}>
                {Object.keys(calculators).map((key) => {
                  return (
                    <MenuItem key={key} value={key}>
                      {calculators[key].label}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            {this.textField(this.handleMaxChange, 'BPM', '最大心拍数', { value: max ? max : '' })}
          </Grid>
        </Grid>
        <Coefficients coefficients={this.state.coefficients} max={this.state.max} />
      </div>
    )
  }
}

export default withStyles(styles)(Form)
