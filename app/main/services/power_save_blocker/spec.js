import { powerSaveBlocker } from 'electron'

import Service from './'

describe('PowerSaveBlocker', () => {
  describe('activate', () => {
    beforeAll(() => {
      Service.activate()
    })
    afterAll(() => {
      Service.deactivate()
    })

    it('has activate member', () => {
      expect(Service.activate).toBeDefined()
    })
    it('delegates to electron powerSaveBlocker#start', () => {
      expect(powerSaveBlocker.start).toHaveBeenCalledWith('prevent-display-sleep')
    })
    it('is Started', () => {
      expect(Service.isStarted()).toBe(true)
    })
  })

  describe('deactivate', () => {
    let id
    beforeAll(() => {
      Service.activate()
      id = Service.powerSaveId
      Service.deactivate()
    })

    it('has deactivate member', () => {
      expect(Service.deactivate).toBeDefined()
    })
    it('delegates to electron powerSaveBlocker#stop', () => {
      expect(powerSaveBlocker.stop).toHaveBeenCalledWith(id)
    })
    it('is not Started', () => {
      expect(Service.isStarted()).toBe(false)
    })
  })
})
