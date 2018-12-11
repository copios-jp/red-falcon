export default (theme) => ({
  appTitle: {
    flexGrow: 1,
  },

  activateBtn: {
    alignSelf: 'center',
    margin: 'auto!important',
    width: '22vw!important',
    height: '22vw!important',
    fontSize: '20vw',
  },

  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  root: {
    display: 'flex',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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

  sensorCard: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
  },

  //  icon: {
  //    color: 'white',
  //  },
  cardHeader: {
    top: 0,
    height: '32px',
    lineHeight: '32px',
    minHeight: '32px',
    fontSize: '26px',
    paddingLeft: theme.spacing.unit * 2,
    textAlign: 'center',
    color: 'white',
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
    position: 'relative',
  },

  activityIndicator: {
    display: 'inline',
    position: 'absolute',
    marginTop: '20px',
    marginLeft: '14px',
    left: 0,
  },

  card_1_1: {
    width: '92%',
    height: '92%',
    fontSize: '50vh',
  },

  card_1_2: {
    width: '42%',
    height: '92%',
    fontSize: '20vh',
  },

  card_2_2: {
    width: '42%',
    height: '42%',
    fontSize: '20vh',
  },

  card_2_3: {
    width: '26%',
    height: '42%',
    fontSize: '15vh',
  },

  card_3_3: {
    width: '26%',
    height: '26%',
    fontSize: '8vh',
  },

  rate_0: {
    backgroundColor: '#000000',
  },

  rate_1: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
    backgroundColor: '#0d47a1',
  },

  rate_2: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
    backgroundColor: '#1b5e20',
  },
  rate_3: {
    backgroundColor: '#f57f17',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
  },
  rate_4: {
    backgroundColor: '#e65100',

    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
  },
  rate_5: {
    backgroundColor: '#b71c1c',

    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',
  },

  cardFooter: {
    minHeight: theme.spacing.unit * 4,
    lineHeight: `${theme.spacing.unit * 4}px`,
    fontSize: '26px',
    paddingLeft: theme.spacing.unit * 2,
    color: 'white',
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)',

    position: 'relative',
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
    minHeight: theme.spacing.unit * 4,
    lineHeight: `${theme.spacing.unit * 4}px`,
    flexDirection: 'row',
    display: 'flex',
    bottom: 0,
    width: '100%',
    paddingRight: theme.spacing.unit,
    borderTopWidth: '1px',
    borderTopStyle: 'groove',
    borderTopColor: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'inset 0 10px 20px 1px black',
  },

  copyright: {
    lineHeight: 'inherit',
    paddingLeft: theme.spacing.unit,
    flexGrow: 1,
  },

  bottomBarItem: {
    lineHeight: 'inherit',
    paddingLeft: theme.spacing.unit,
    '&:last': {
      paddingRight: theme.spacing.unit,
    },
  },
})
