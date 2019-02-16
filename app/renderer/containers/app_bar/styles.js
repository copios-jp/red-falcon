export default (theme) => ({
  root: {
    height: '3.5rem',
    WebkitAppRegion: 'drag',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingRight: theme.spacing.unit,
    paddingLeft: '100px',
  },
  appTitle: {
    flexGrow: 1,
  },
  powerButtonOff: {
    fill: theme.palette.power.off,
  },
  powerButtonOn: {
    fill: theme.palette.power.on,
  },
  buttonBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
})
