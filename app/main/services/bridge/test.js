import bridge from './'

const webContents = {
  send: jest.fn(),
}
let scanner

describe('bridge', () => {
  beforeEach(() => {
    scanner = mockApiMember({})
    bridge(scanner, webContents)
  })
  afterEach(() => {
    scanner.removeAllListeners()
  })

  it('binds once on scanner-activated', () => {
    expect(scanner.on.mock.calls[0][0]).toEqual('scanner-activated')
  })
  it('binds once on scanner-deactivated', () => {
    expect(scanner.on.mock.calls[1][0]).toEqual('scanner-deactivated')
  })
  it('adds receiver added and removed on activated', () => {
    scanner.emit('scanner-activated')
    expect(scanner.on.mock.calls[2][0]).toEqual('receiver-added')
    expect(scanner.on.mock.calls[3][0]).toEqual('receiver-removed')
  })

  it('removes all listeners to receiver added and removed on deactivated', () => {
    scanner.emit('scanner-deactivated')
    expect(scanner.removeAllListeners).toBeCalledWith('receiver-added')
    expect(scanner.removeAllListeners).toBeCalledWith('receiver-removed')
  })
})
