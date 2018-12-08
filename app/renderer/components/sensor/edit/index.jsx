import * as React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'
import Form from './Form'

const EditSensor = (props) => {
  const { classes, sensor, onDone } = props
  const previousState = { ...sensor.state }

  const onCancel = () => {
    sensor.setState((state) => {
      return { ...state, ...previousState }
    })
    onDone()
  }

  return (
    <Dialog
      fullWidth={true}
      open={true}
      onClose={onCancel}
      aira-labelledby="form-dialog-title"
      className={classes.editDialog}>
      <DialogTitle>利用者情報</DialogTitle>
      <DialogContent>
        <Form sensor={sensor} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onCancel} color="secondary">
          キャンセル
        </Button>
        <Button variant="contained" onClick={onDone} color="primary">
          保存
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withStyles(styles)(EditSensor)
