import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'

const styles = () => ({
  root: {
    background: 'black url("images/icon.png") center 55% no-repeat',
    margin: 0,
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    cursor: 'default',
    '&:empty': {
      cursor: 'pointer',
    },
  },
})

class Main extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
      </div>
    )
  }
}

export default withStyles(styles)(Main)

