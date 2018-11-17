import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: { main: '#ff8f00'},
    type: 'dark'
  },
  typography: {
    useNextVariants: true,
  },
})

export default theme
