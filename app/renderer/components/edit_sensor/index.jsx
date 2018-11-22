import * as React from 'react'
import { Button, Dialog, DialogActions, DialogTitle } from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles'
import styles from '../../styles/'
import Form from './Form'

let isOpen = true
let cachedAge

const save = (data, callback) => {
  data.age = cachedAge
  close(callback)
}
const close = (callback) => {
  isOpen = false
  callback()
}

const cacheAge = (event) => {
  cachedAge = parseInt(event.target.value)
}

const EditSensor = (props) => {
  const { channel, classes, done } = props
  const onSave = save.bind({}, channel.data, done)
  const onClose = close.bind({}, done)

  cachedAge = channel.data.age

  return (
    <div className={classes.editRoot}>
      <Dialog open={isOpen} onClose={onClose} aira-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{`受信機編集(${channel.channelId})`}</DialogTitle>
        <Form age={channel.data.age} cacheAge={cacheAge} id={channel.channelId} />
        <DialogActions>
          <Button variant="contained" onClick={onClose} color="secondary">
            キャンセル
          </Button>
          <Button variant="contained" onClick={onSave} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(EditSensor)
