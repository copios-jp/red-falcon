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
  })
}

export const app = {
  fart: 'face'
}

