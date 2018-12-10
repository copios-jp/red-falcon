export default (theme) => ({
  badge: {
    background: 'green',
    backgroundImage: 'radial-gradient(lime, transparent)',
    borderRadius: '50%',
    boxShadow: '0 0 0px #111 inset, 0 0 40px lime',
    animation: '13s green infinite',
    width: theme.spacing.unit * 3,
    height: theme.spacing.unit * 3,
  },
})
