export default (theme) => ({
  root: {
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

  item: {
    lineHeight: 'inherit',
    paddingLeft: theme.spacing.unit,
  },

})

