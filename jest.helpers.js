const helpers = {
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
  },

  removeAllListenersImplementation(bus) {
    return function(event) {
      if(event) {
        delete bus[event]
      } else {
        Object.keys(bus).forEach((event) => {
          delete bus[event]
        })
      }
    }
  },

  apiMember(bus, extended) {
    let thisBus = {...bus}
    return Object.assign({
      send: jest.fn(),
      activate: jest.fn(),
      deactivate: jest.fn(),
      remove: jest.fn(),
      on: jest.fn(helpers.onImplementation(thisBus)),
      off: jest.fn(helpers.onImplementation(thisBus)),
      once: jest.fn(helpers.onImplementation(thisBus)),
      emit: jest.fn(helpers.emitImplementation(thisBus)),
      removeAllListeners: jest.fn(helpers.removeAllListenersImplementation(thisBus)),
      mockRestore() {
        ['activate', 'deactivate', 'on', 'emit', 'once', 'removeAllListeners'].forEach((member) => this[member].mockRestore)
        thisBus = {}
      }
    }, extended)
  }
}

global.helpers = helpers
global.mockApiMember = helpers.apiMember
