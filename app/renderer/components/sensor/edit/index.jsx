import * as React from 'react'
import { Button, Dialog, Divider, DialogActions, DialogTitle } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'
import Form from './Form'

const EditSensor = (props) => {
  const { sensor, classes, onDone } = props
  const previousState = { ...sensor.state }

  const onCancel = () => {
    sensor.setState((state) => {
      return { ...state, ...previousState }
    })
    onDone()
  }

  return (
    <div className={classes.editRoot}>
      <Dialog open={true} onClose={onCancel} aira-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{`受信機編集(${sensor.state.channel})`}</DialogTitle>
        <Form sensor={sensor} />
        <Divider />
        <DialogActions>
          <Button variant="contained" onClick={onCancel} color="secondary">
            キャンセル
          </Button>
          <Button variant="contained" onClick={onDone} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(EditSensor)
