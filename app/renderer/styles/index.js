export default (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  appTitle: {
    flexGrow: 1,
  },
  grid: {
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    backgroundImage: 'url("images/icon.png")',
    backgroundSize: '55%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.background.paper,
    margin: 0,
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },

  activateBtn: {
    alignSelf: 'center',
    margin: 'auto!important',
    width: '22vw!important',
    height: '22vw!important',
    fontSize: '20vw',
  },

  sensorCard: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    backgroundColor: 'pink',
  },

  sensorContent: {
    flexGrow: 1,
  },

  sensorRate: {
    fontSize: '30vh',
  },

  icon: {
    color: 'white',
  },
  userName: {
    height: '32px',
    lineHeight: '32px',
    fontSize: '26px',
    textAlign: 'center',
    color: 'white',
    backgroundColor: theme.palette.background.paper,
    // background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
  },

  dataIndicator: {
    display: 'inline',
    position: 'absolute',
    marginTop: '20px',
    marginLeft: '14px',
    left: 0,
  },

  sensor: {
    color: 'white',
    textAlign: 'center',
  },

  card_1_1: {
    width: '99%',
    height: '99%',
  },

  card_1_1_text: {
    fontSize: '65vw',
  },

  card_1_2: {
    width: '49%',
    height: '99%',
  },

  card_1_2_text: {
    fontSize: '25vh',
  },

  card_2_2: {
    width: '49%',
    height: '49%',
  },

  card_2_2_text: {
    fontSize: '25vh',
  },

  card_2_3: {
    width: '32%',
    height: '49%',
  },

  card_2_3_text: {
    fontSize: '16vh',
  },

  card_3_3: {
    width: '32%',
    height: '32%',
  },

  card_3_3_text: {
    fontSize: '8vh',
  },

  rate_0: {
    backgroundColor: '#000000',
  },

  rate_1: {
    backgroundColor: '#0d47a1',
  },

  rate_2: {
    backgroundColor: '#1b5e20',
  },
  rate_3: {
    backgroundColor: '#f57f17',
  },
  rate_4: {
    backgroundColor: '#e65100',
  },
  rate_5: {
    backgroundColor: '#b71c1c',
  },

  editTextField: {
    marginTop: theme.spacing.unit * 2,
  },

  coefficients: {
    color: '#fff',
    marginTop: theme.spacing.unit,
  },

  coefficientsTitle: {
    padding: theme.spacing.unit,
  },

  zonePercentageLabel: {
    display: 'inline-block',
    textAlign: 'center',
    flexGrow: 1,
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
    height: theme.spacing.unit * 7,
  },

  statusBar: {
    minHeight: '26px',
    flexDirection: 'row',
    display: 'flex',
    bottom: 0,
    width: '100%',
    paddingRight: theme.spacing.unit,
    borderTopWidth: '1px',
    borderTopStyle: 'groove',
    borderTopColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    // boxShadow: 'inset 0 10px 20px 1px black',
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
