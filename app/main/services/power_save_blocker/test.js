import { powerSaveBlocker } from 'electron'

import Service from './'

describe('PowerSaveBlocker', () => {
  describe('activate', () => {
    beforeEach(() => {
      Service.activate()
    })
    afterEach(() => {
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
    it('does not double activate', () => {
      Service.activate()
      expect(powerSaveBlocker.start).toHaveBeenCalledTimes(1)
    })
  })
  describe('deactivate', () => {
    let id
    beforeEach(() => {
      Service.activate()
      id = Service.blockId
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

    it('does not double activate', () => {
      Service.deactivate()
      expect(powerSaveBlocker.stop).toHaveBeenCalledTimes(1)
    })
  })
})
