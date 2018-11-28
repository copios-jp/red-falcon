export const powerSaveBlocker = {
  id: undefined,

  start: jest.fn(()=>{
    powerSaveBlocker.id = 1
    return powerSaveBlocker.id
  }),

  stop: jest.fn((id) => {
    if(id === powerSaveBlocker.id) {
      powerSaveBlocker.id = undefined
    }
  }),

  isStarted: jest.fn((id) => {
    return id === powerSaveBlocker.id && id !== undefined
  }),

  mockClear() {
    this.start.mockClear()
    this.stop.mockClear()
    this.isStarted.mockClear()
    delete this.id
  }
}

export const app = {
  fart: 'face'
}

