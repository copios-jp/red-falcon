import { ipcRenderer } from 'electron'

import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'
import { Print } from '@material-ui/icons'
import styles from '../../../styles'
import { formatDateTime } from '../../../helpers/time_formatter'

import { withStyles } from '@material-ui/core/styles'
import { getReport } from '../../../../services/analytics'

import UserSection from './sections/user/'
import TrainingSection from './sections/training/'
import TrainingScoreSection from './sections/training_score/'
import TimeInZoneSection from './sections/time_in_zone/'
import HeartRateSection from './sections/heart_rate/'
import MemoSection from './sections/memo/'
import ProgrammingSection from './sections/program/'
import { TitledRow } from './shared/'

export class Report extends Component {
  constructor() {
    super()
    ipcRenderer.on('print-complete', this.printComplete)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.showReport !== this.props.showReport
  }

  onPrint = (e) => {
    e.stopPropagation()
    this.originalWidth = window.outerWidth
    const fileName = `${this.props.sensor.name}_${new Date().toISOString()}`.replace(' ', '_')
    window.resizeTo(776, window.outerHeight)
    // keep this - the charts need time to resize
    // and print media queries will not wait.
    window.setTimeout(() => {
      ipcRenderer.send('print', fileName)
    }, 1000)
  }

  printComplete = () => {
    window.resizeTo(this.originalWidth, window.outerHeight)
    this.props.handleChange({ showReport: false })
  }

  onClick = (e) => {
    e.stopPropagation()
  }

  onClose = (e) => {
    e.stopPropagation()
    this.props.handleChange({ showReport: false })
  }

  dialogTitle = () => {
    return (
      <DialogTitle variant="dense">
        <TitledRow color="primary" title="トレーニング報告" text={formatDateTime()} inline={true} />
      </DialogTitle>
    )
  }

  dialogContent = () => {
    const {
      sensor: { history },
      classes,
    } = this.props
    const summary = getReport(history)
    return (
      <DialogContent className={classes.reportDialogContent}>
        <div className={classes.reportGroup}>
          <UserSection {...this.props.sensor} max={history[0].max} />
          <TrainingSection created={history[0].created} summary={summary} />
          <MemoSection />
        </div>
        <div className={classes.reportGroup}>
          <TrainingScoreSection {...summary} />
          <TimeInZoneSection {...summary} />
        </div>
        <div className={classes.reportGroup}>
          <HeartRateSection history={history} max={history[0].max} />
        </div>
        <div className={classes.reportGroup}>
          <ProgrammingSection />
        </div>
      </DialogContent>
    )
  }

  render() {
    const {
      sensor: { showReport },
      classes,
    } = this.props

    return (
      <Dialog
        PaperProps={{ elevation: 0, style: { border: 'none' } }}
        fullScreen={true}
        open={showReport}
        onClick={this.onClick}>
        {this.dialogTitle()}
        {this.dialogContent()}
        <DialogActions className={classes['no-print']}>
          <Button onClick={this.onPrint}>
            <Print /> Print
          </Button>
          <Button onClick={this.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(Report)
