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
    overflow: 'hidden',
    backgroundColor: 'pink',

    // backgroundColor: theme.palette.background.paper,
    flexGrow: 1,
  },

  loaderWrapper: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loader: {},

  grid: {
    backgroundImage: 'url("images/icon.png")',
    backgroundSize: '55%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
    // backgroundColor: theme.palette.background.paper,
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

  cardHeader: {
    minHeight: theme.spacing.unit * 4,
    fontSize: 'xx-large',
    color: theme.palette.text.main,
    position: 'relative',
    padding: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
  },

  timer: {
    paddingRight: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    minWidth: '100px',
  },

  activityIndicator: {
    marginLeft: theme.spacing.unit,
  },

  cardName: {
    flexGrow: 1,
    marginLeft: theme.spacing.unit * 3,
  },

  sensorCard: {
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    borderLeft: `1px outset ${theme.palette.background.paper}`,
    borderRight: `1px outset ${theme.palette.background.paper}`,
    paddingRight: '1px',
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

  zone_0: {
    backgroundColor: theme.palette.rest,
    backgroundImage: theme.gradient,
    fill: theme.palette.rest,
  },

  zone_1: {
    backgroundColor: theme.palette.recovery,
    backgroundImage: theme.gradient,
    fill: theme.palette.recovery,
  },

  zone_2: {
    backgroundColor: theme.palette.lightAerobic,
    backgroundImage: theme.gradient,
    fill: theme.palette.lightAerobic,
  },
  zone_3: {
    backgroundColor: theme.palette.hardAerobic,
    backgroundImage: theme.gradient,
  },
  zone_4: {
    backgroundColor: theme.palette.anaerobic,
    backgroundImage: theme.gradient,
  },
  zone_5: {
    backgroundColor: theme.palette.maximum,
    backgroundImage: theme.gradient,
  },

  cardRate: {
    marginLeft: theme.spacing.unit,
    alignSelf: 'center',
  },

  cardFooter: {
    minHeight: theme.spacing.unit * 4,
    fontSize: 'xx-large',
    color: theme.palette.text.main,
    position: 'relative',
    padding: theme.spacing.unit / 2,
    paddingLeft: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-between',
  },

  padded: {
    padding: theme.spacing.unit,
  },

  inlineHistory: {
    height: '30px',
    alignSelf: 'center',
    display: 'flex',
    width: '60px',
    alignItems: 'flex-end',
  },

  editTextField: {
    marginTop: theme.spacing.unit * 2,
  },

  coefficients: {
    color: theme.palette.text.main,
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
    color: theme.palette.text.main,
    height: theme.spacing.unit * 7,
  },

  statusBar: {
    minHeight: theme.spacing.unit * 4,
    lineHeight: `${theme.spacing.unit * 4}px`,
    flexDirection: 'row',
    display: 'flex',
    bottom: 0,
    width: '100%',
    paddingRight: theme.spacing.unit * 2,
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
    color: theme.palette.text.main,
  },

  bottomBarItem: {
    lineHeight: 'inherit',
    paddingLeft: theme.spacing.unit,
  },

  '@media print': {
    'no-print': {
      display: 'none !important',
    },
    reportCharts: {},
  },

  reportDialogContent: {
    backgroundColor: '#fff',
  },

  chartCard: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing.unit * 2,
    flexGrow: 1,
  },

  reportCharts: {
    backgroundColor: 'white',
    alignItems: 'center',
  },

  reportGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing.unit * 3,
  },

  trainingScoreChart: {
    margin: 'auto',
    left: '-15px',
    top: '20px',
    alignSelf: 'center',
  },

  timeInZoneChartWrapper: {
    height: '100%',
    textAlign: 'center',
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    maxHeight: '270px',
  },

  timeInZoneChart: {},

  heartRateChart: {},

  reportDataGroup: {
    border: '1px inset grey',
    borderRadius: 10,
    overflow: 'hidden',
  },

  reportDataGroupData: {
    height: '100%',
  },

  reportDataGroupHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#424242',
    color: 'white',
    padding: '8px',
  },

  reportRow: {
    justifyContent: 'space-between',
  },

  titledRow: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },

  titledRowTitle: {
    marginRight: theme.spacing.unit / 2,
  },

  titledRowText: {
    alignSelf: 'center',
  },
})
