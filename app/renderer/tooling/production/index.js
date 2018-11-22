import * as Sentry from '@sentry/electron'

export default {
  apply() {
    Sentry.init({ dsn: 'https://ba5d8efaf4bd41acb8be9b480274fe62@sentry.io/1328356' })
  },
}
