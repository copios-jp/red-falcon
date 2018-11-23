import * as React from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../../styles/'
import Form from './Form'

const EditSensor = (props) => {
  const { channel, classes, isOpen, onClose } = props
  const cachedAge = channel.data.age
  const onCancel = () => {
    channel.data.age = cachedAge
    onClose()
  }

  return (
    <div className={classes.editRoot}>
      <Dialog open={isOpen} onClose={onClose} aira-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{`受信機編集(${channel.id})`}</DialogTitle>
        <Form data={channel.data} id={channel.id} />
        <DialogActions>
          <Button variant="contained" onClick={onCancel} color="secondary">
            キャンセル
          </Button>
          <Button variant="contained" onClick={onClose} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(EditSensor)
