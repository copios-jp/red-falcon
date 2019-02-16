import Renderer from './renderer'
export { Activate as Activate } from './renderer'
export { Deactivate as Deactivate } from './renderer'

export const on = (...args) => {
  Renderer.on(...args)
}

export const off = (...args) => {
  Renderer.off(...args)
}

export const bind = (action, events) => {
  for(const event in events) {
    Renderer[action](event, events[event])
  }
}

export default Renderer
