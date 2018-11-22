export default (envs = {}) => {
  const tooling = envs[process.env.NODE_ENV || 'production']
  if (tooling) {
    tooling.apply()
  }
  return tooling || {}
}
