export default (theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  appTitle: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    backgroundImage: 'url("images/icon.png")',
    backgroundSize: '55%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  gridList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  activateBtn: {
    alignSelf: 'center',
    margin: 'auto!important',
    width: '22vw!important',
    height: '22vw!important',
    fontSize: '20vw',
  },

  userName: {
    fontSize: theme.typography.fontSize * 1.5,
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
  },

  icon: {
    color: 'white',
  },
  gridTileBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
  },

  gridListItem: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.background.paper,
  },

  dataIndicator: {
    display: 'inline',
    position: 'absolute',
    margin: theme.spacing.unit * 2 + 2,
    left: 0,
  },

  sensor: {
    color: 'white',
    textAlign: 'center',
  },

  sensor_1: {
    fontSize: '40vw',
    minWidth: '80vw',
  },

  sensor_2: {
    fontSize: '25vw',
    textAlign: 'center',
    minWidth: '45vw',
  },

  sensor_3: {
    fontSize: '23vw',
    minWidth: '45vw',
  },

  sensor_4: {
    fontSize: '23vw',
    minWidth: '45vw',
  },

  sensor_5: {
    fontSize: '17vw',
    minWidth: '32vw',
  },

  sensor_6: {
    fontSize: '17vw',
    minWidth: '32vw',
  },

  sensor_7: {
    fontSize: '13vw',
    minWidth: '25vw',
  },

  sensor_8: {
    fontSize: '13vw',
    minWidth: '25vw',
  },

  rate_rest: {
    backgroundColor: '#212121',
  },

  rate_recovery: {
    backgroundColor: '#0D47A1',
  },
  rate_aerobic: {
    backgroundColor: '#1B5E20',
  },
  rate_anaerobic: {
    backgroundColor: '#E65100',
  },
  rate_max: {
    backgroundColor: '#B71C1C',
  },

  editRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  editTextField: {
    flexBasis: 200,
    margin: theme.spacing.unit,
  },
  coefficients: {
    color: '#fff',
    marginTop: theme.spacing.unit * 2,
  },

  coefficientsTitle: {
    padding: theme.spacing.unit,
  },

  zonePercentageLabel: {
    display: 'inline-block',
    textAlign: 'center',
    margin: theme.spacing.unit,
    flexGrow: 1,
    minWidth: theme.typography.fontSize * 4,
  },

  zoneRangeLabel: {
    flexGrow: 1,
    minWidth: theme.typography.fontSize * 2,
  },

  zoneData: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: '#fff',
    height: theme.spacing.unit * 8,
  },

  statusBar: {
    flexDirection: 'row',
    display: 'flex',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    paddingRight: theme.spacing.unit,
    backgroundColor: '#ff8f00',
  },

  copyright: {
    padding: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit,
    flexGrow: 1,
  },

  bottomBarItem: {
    padding: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit,
    '&:last': {
      paddingRight: theme.spacing.unit,
    },
  },
})
