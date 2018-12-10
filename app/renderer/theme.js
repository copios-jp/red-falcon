import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff8f00',
    },
    secondary: {
      main: '#000000',
    },
    type: 'dark',
  },
  typography: {
    useNextVariants: true,
  },
})

export default theme
