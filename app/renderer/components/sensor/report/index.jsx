import { ipcRenderer } from 'electron'

import React, { Component } from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core'

import { Card, CardContent, Typography } from '@material-ui/core'
import { Print } from '@material-ui/icons'
import styles from '../../../styles'
import { formatSeconds } from '../../../helpers/time_formatter'

import { withStyles } from '@material-ui/core/styles'
import { getReport } from '../../../../services/analytics'

const TitledRow = withStyles(styles)(({ classes, title, text, inline = false }) => (
  <div
    className={classes.titledRow}
    style={{ textAlign: 'left', display: inline ? 'flex' : 'block' }}>
    <Typography color="primary" variant="h6" className={classes.titledRowTitle}>
      {title}
    </Typography>
    <Typography variant="body1" className={classes.titledRowText}>
      {text}
    </Typography>
  </div>
))

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
    ipcRenderer.send('print')
  }

  printComplete = () => {
    this.props.handleChange({ showReport: false })
  }

  onClose = (e) => {
    e.stopPropagation()
    this.props.handleChange({ showReport: false })
  }

  render() {
    const {
      sensor: { name, age, weight, method, history },
      classes,
    } = this.props
    const summary = getReport(history)
    console.log(summary)
    const formatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }
    const today = new Date().toLocaleString('ja', formatOptions)
    return (
      <Dialog fullScreen={true} open={this.props.sensor.showReport}>
        <DialogTitle>
          Training Session Report {name}
          <TitledRow title="日付" text={today} />
        </DialogTitle>

        <DialogContent style={{ backgroundColor: 'white' }}>
          <Card className={classes.reportCard}>
            <CardContent>
              <Typography variant="h6">トレーニング概容</Typography>
              <div className={classes.reportGroup}>
                <TitledRow title="名前" text={name} inline={true} />
                <TitledRow title="年齢" text={age} inline={true} />
                <TitledRow title="体重" text={weight} inline={true} />

                {/*<TitledRow title="実施期間" text={`${history[0].created.toLocaleString('ja', formatOptions)} - ${history[history.length - 1].created.toLocaleString('ja', formatOptions)}`} inline={true} />
                 */}
              </div>

              <div className={classes.reportGroup}>
                <TitledRow title="消費カロリー" text={Math.round(summary.calories)} inline={true} />
                <TitledRow title="MAX%計算式" text={method} inline={true} />
                <TitledRow title="最大心拍数" text={history[0].max} inline={true} />
              </div>

              <div className={classes.reportGroup}>
                <TitledRow title="平均心拍数" text={summary.rate} inline={true} />
                <TitledRow title="平均心拍数MAX%" text={summary.percentageOfMax} inline={true} />
                <TitledRow title="期間" text={formatSeconds(summary.duration)} inline={true} />
              </div>
            </CardContent>
          </Card>
          <Card className={classes.reportCard}>
            <CardContent>
              <Typography variant="h6">トレーニングゾーン</Typography>
              <div className={classes.reportGroup}>
                Some Charts for {JSON.stringify(summary.zones)}
              </div>
            </CardContent>
          </Card>
          <Card className={classes.reportCard}>
            <CardContent>
              <Typography variant="h6">トレーニング中心拍数</Typography>
              <div className={classes.reportGroup}>
                Some Charts for{' '}
                {JSON.stringify(
                  history.map((item) => {
                    return item.rate
                  }),
                )}
              </div>
            </CardContent>
          </Card>
        </DialogContent>

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
