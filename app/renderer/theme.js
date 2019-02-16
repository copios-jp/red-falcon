import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff8f00',
    },
    secondary: {
      main: '#000000',
    },
    action: {
      main: 'green',
    },
    power: {
      off: 'green',
      on: 'lime',
    },
    rest: '#000000',
    recovery: '#0d47a1',
    lightAerobic: '#1b5e20',
    hardAerobic: '#f57f17',
    anaerobic: '#e65100',
    maximum: '#b71c1c',
    type: 'dark',
    text: {
      main: 'lightgrey',
    },
  },
  gradient: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
  typography: {
    useNextVariants: true,
  },
})

export default theme
