import * as React from 'react'
import { DialogContent, DialogContentText, TextField, InputAdornment } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../styles/'

export default withStyles(styles)((props) => {
  const { age, cacheAge, classes, id } = props
  return (
    <DialogContent>
      <DialogContentText>
        {`心拍ゾーンを計算する為、受信機${id}を御利用いただいている方の年齢を入力ください。`}
      </DialogContentText>
      <TextField
        onChange={cacheAge}
        className={classes.edtiTextField}
        variant="outlined"
        value={age}
        label="年齢"
        InputProps={{
          endAdornment: <InputAdornment position="start">才</InputAdornment>,
        }}
      />
    </DialogContent>
  )
})
