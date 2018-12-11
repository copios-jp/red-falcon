import * as React from 'react'
import { Component } from 'react'
import { methods, MANUAL } from '../../../../services/analytics/MaxHeartRateCalculators'
import { methods as sexes } from '../../../../services/analytics/CalorieBurnPerHourCalculators'

import { getMaxHeartRate } from '../../../../services/analytics/'
import { MenuItem, Grid, TextField, InputAdornment } from '@material-ui/core'
import Coefficients from './Coefficients'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

class Form extends Component {
  handleFieldChange = (name) => (event) => {
    const data = { ...this.props.data }
    const value = event.target.value
    if (name === 'method') {
      data.max = getMaxHeartRate(data)
    }
    data[name] = value
    this.props.handleChange(data)
  }

  optionsFor(collection) {
    return Object.keys(collection).map((key) => {
      const label = collection[key].label
      return (
        <MenuItem key={key} value={key}>
          {label}
        </MenuItem>
      )
    })
  }

  render() {
    const { age, weight, name, method, coefficients, sex } = this.props.data
    const max = getMaxHeartRate(this.props.data)
    const disableMax = method !== MANUAL
    return (
      <Grid container spacing={24}>
        <Grid item xs>
          {this.textField('name', '様', '名前', name)}
          {this.textField('sex', '性', '性別', sex, {
            select: true,
            children: this.optionsFor(sexes),
          })}
          {this.textField('age', '才', '年齢', age)}
          {this.textField('weight', 'Kg', '体重', weight)}
          {this.textField('method', '', '最大心拍数計算式', method, {
            select: true,
            children: this.optionsFor(methods),
          })}
          {this.textField('max', 'BPM', '最大心拍数', max, { disabled: disableMax })}
        </Grid>
        <Grid item xs>
          <Coefficients coefficients={coefficients} max={max} />
        </Grid>
      </Grid>
    )
  }

  textField(name, adornment, label, value, props) {
    const { classes } = this.props
    return (
      <TextField
        name={name}
        fullWidth={true}
        onChange={this.handleFieldChange(name)}
        className={classes.editTextField}
        variant="outlined"
        label={label}
        value={value}
        InputProps={{
          endAdornment: <InputAdornment position="start">{adornment}</InputAdornment>,
        }}
        {...props}
      />
    )
  }
}

export default withStyles(styles)(Form)
