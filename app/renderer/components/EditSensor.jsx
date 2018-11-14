import * as React from 'react';

import { withStyles } from '@material-ui/core/styles'
import styles from '../styles/'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';


const extendedStyles = (theme) => {
  const local = (theme) => {
    return (
      {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      margin: {
        margin: theme.spacing.unit,
      },
      textField: {
        flexBasis: 200,
      }
    })
  }
  return {...styles(theme), ...local(theme)}
}

const EditSensor = (props) => {

  const { channel, classes, done } = props

  let isOpen = true
  let cachedAge = channel.data.age

  const cacheAge = (event) => {
    cachedAge = parseInt(event.target.value)
  }

  const save = () => {
    channel.data.age = cachedAge
    isOpen = false
    done()
  }

  const handleClose = () => {
    isOpen = false
    done()
  }

  return (
    <div className={classes.root}>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aira-labelledby='form-dialog-title'
      >
        <DialogTitle id="form-dialog-title">
          {`受信機編集(${channel.channelId})`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`心拍ゾーンを計算する為、受信機${channel.channelId}を御利用いただいている方の年齢を入力ください。`}
          </DialogContentText>
           <TextField
            onChange={cacheAge}
            className={classNames(classes.margin, classes.textField)}
            variant="outlined"
            value={channel.data.age}
            label="年齢"
            InputProps={{
              endAdornment: <InputAdornment position="start">才</InputAdornment>,
            }}
          />
        </DialogContent>
        <DialogActions>
            <Button variant="contained" onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" onClick={save} color="primary">
              Done
            </Button>
          </DialogActions>
      </Dialog>
    </div>
  )
}

export default withStyles(extendedStyles)(EditSensor)


