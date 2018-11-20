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
  copyright: {
    position: 'fixed',
    bottom: 0,
    backgroundColor: 'transparent',
    paddingLeft: theme.spacing.unit,
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
    margin: theme.spacing.unit
  }
})
