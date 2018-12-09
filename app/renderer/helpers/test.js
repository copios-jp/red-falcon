import bind from './bind'
import { ipcRenderer } from 'electron'
jest.mock('electron', () => {
  return {
    ipcRenderer: mockApiMember(),
  }
})

describe('bind helper', () => {
  const receiver = {
    mainEvents: {
      onEvent: ['some-event', 'some-other-event'],
    },

    onEvent: jest.fn(),
  }

  it('binds configured ipcRenderer events to handlers', () => {
    bind.call(receiver, 'on')
    ipcRenderer.emit('some-event', 'alice')
    ipcRenderer.emit('some-other-event', 'bob')
    expect(receiver.onEvent.mock.calls[0][0]).toEqual('alice')
    expect(receiver.onEvent.mock.calls[1][0]).toEqual('bob')
    ipcRenderer.mockRestore()
  })

  it('removes configured lesters with off', () => {
    bind.call(receiver, 'off')
    expect(ipcRenderer.off).toBeCalledWith('some-event', receiver.onEvent)
    expect(ipcRenderer.off).toBeCalledWith('some-other-event', receiver.onEvent)
  })
})
