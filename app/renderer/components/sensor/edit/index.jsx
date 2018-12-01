import * as React from 'react'
import { Button, Dialog, Divider, DialogActions, DialogTitle } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'
import Form from './Form'

const EditSensor = (props) => {
  const { sensor, classes, onSave, onCancel, isOpen} = props
  const id = sensor.transmitter.channel

  const handleSave = () => {
    onSave(sensor)
  }
  return (
    <div className={classes.editRoot}>
      <Dialog open={isOpen} onClose={onCancel} aira-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{`受信機編集(${id})`}</DialogTitle>
        <Form sensor={sensor}/>
        <Divider/>
        <DialogActions>
          <Button variant="contained" onClick={onCancel} color="secondary">
            キャンセル
          </Button>
          <Button variant="contained" onClick={handleSave} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(EditSensor)
