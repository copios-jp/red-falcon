import * as React from 'react'
import { DialogContent, DialogContentText, TextField, InputAdornment } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'

export default withStyles(styles)((props) => {
  const { classes, id, sensor } = props
  const changeAge = (event) => {
    sensor.age = parseInt(event.target.value) || undefined
  }

  console.log(sensor.zoneCoefficients)

  const changeCoefficients = (index, event) => {
    const correctedIndex = Math.abs(index - (sensor.zoneCoefficients.length - 1))
    sensor.zoneCoefficients[correctedIndex] = parseInt(event.target.value) / 100.0
  }

  return (
    <DialogContent>
      <DialogContentText>
        {`御利用いただいている方の詳細を入力ください。`}
      </DialogContentText>
      <div>
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
        <hr />
        {([...sensor.zoneCoefficients]).reverse().map((coef, index) => (
          <div key={index}>
            <div>心拍ゾーン</div>
            <TextField
              onChange={changeCoefficients.bind({}, index)}
              defaultValue={coef *  100}
              className={classes.editTextField}
              variant="outlined"
              InputProps={{
                endAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
            />
            <span className="card_{index}">{index}</span>
          </div>
        ))}
      </div>
    </DialogContent>
  )
})
