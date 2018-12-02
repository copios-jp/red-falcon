global.helpers = {
  onImplementation(bus) {
    return (event, handler) => {
      let handlers = bus[event]
      if (handlers === undefined) {
        handlers = []
      }
      handlers.push(handler)
      bus[event] = handlers
    }
  },
  emitImplementation(bus) {
    return function() {
      const args = Array.from(arguments)
      const event = args.shift()
      const handlers = bus[event]
      if (handlers) {
        handlers.forEach((handler) => {
          handler.apply({}, args)
        })
      }
    }
  }
}
