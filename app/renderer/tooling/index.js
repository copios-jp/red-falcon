import development from './development/'
const tooling = { development }

export default {
  apply() {
    const env = process.env.NODE_ENV
    if(tooling[env]) {
      tooling[env].apply()
    }
  }
}
