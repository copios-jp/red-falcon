import React, { Component } from 'react'

import { withStyles } from '@material-ui/core/styles'
import { AppBar, Main, Footer } from '../'

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  }
})

export class App extends Component {
  render() {
    const { classes = {} } = this.props
    return (
      <div className={classes.root}>
        <AppBar/>
        <Main/>
        <Footer/>
      </div>
    )
  }
}

export default withStyles(styles)(App)

