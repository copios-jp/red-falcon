import bridge from './'

const webContents = {
  send: jest.fn(),
}
const scanner = helpers.apiMember({})
// const transmitter = helpers.apiMember({})
// const receiver = helpers.apiMember({})

describe('bridge', () => {
  beforeEach(() => {
    bridge(scanner, webContents)
  })
  afterEach(() => {
    scanner.emit('scanner-deactivated')
  })

  it('binds once on scanner-activated', () => {
    expect(scanner.once.mock.calls[0][0]).toEqual('scanner-activated')
  })
  it('binds once on scanner-deactivated', () => {
    expect(scanner.once.mock.calls[1][0]).toEqual('scanner-deactivated')
  })
  it('adds receiver added and removed on activated', () => {
    scanner.emit('scanner-activated')
    expect(scanner.on.mock.calls[0][0]).toEqual('receiver-added')
    expect(scanner.on.mock.calls[1][0]).toEqual('receiver-removed')
  })

  it('removes all listeners to receiver added and removed on deactivated', () => {
    scanner.emit('scanner-deactivated')
    expect(scanner.removeAllListeners).toBeCalledWith('receiver-added')
    expect(scanner.removeAllListeners).toBeCalledWith('receiver-removed')
  })
})
