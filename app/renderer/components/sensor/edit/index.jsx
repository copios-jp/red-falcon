import * as React from 'react'
import { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Form from './Form'
import styles from '../../../styles/'

class EditSensor extends Component {
  state = {
    ...this.props.sensor.state,
  }

  oldState = { ...this.props.sensor.state }

  onCancel = () => {
    this.props.onDone(this.oldState)
  }

  onSave = () => {
    this.props.onDone({ ...this.state })
  }

  handleChange = (value) => {
    this.setState({ ...value })
  }

  render() {
    return (
      <Dialog open={true} onClose={this.onCancel} aira-labelledby="form-dialog-title">
        <DialogTitle>利用者情報</DialogTitle>
        <DialogContent>
          <Form data={{ ...this.state }} handleChange={this.handleChange} />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={this.onCancel} color="secondary">
            キャンセル
          </Button>
          <Button variant="contained" onClick={this.onSave} color="primary">
            保存
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(EditSensor)
