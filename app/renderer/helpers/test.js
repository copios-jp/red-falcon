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
    setState: jest.fn((callback) => {
      callback({})
    }),
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

  it('provisions onReceiver for free!', () => {
    receiver.mainEvents.onReceiver = ['receiver-event']
    bind.call(receiver, 'on')
    ipcRenderer.emit('receiver-event', receiver, [receiver])
    ipcRenderer.mockRestore()
    expect(receiver.setState).toBeCalled()

    receiver.setState.mockClear()
  })

  it('provisions onTransmitter for free!', () => {
    const transmitter = {}
    receiver.mainEvents.onTransmitter = ['transmitter-event']
    bind.call(receiver, 'on')
    ipcRenderer.emit('transmitter-event', transmitter, [transmitter])
    ipcRenderer.mockRestore()
    expect(receiver.setState).toBeCalled()

    receiver.setState.mockClear()
  })

  it('errors on unknown handler', () => {
    receiver.mainEvents.blackHole = ['oops-need-to-define-that-mate']
    expect(() => {
      bind.call(receiver, 'on')
    }).toThrow()
  })
})
