import './jest.helpers'
const Enzyme = require('enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')

// Setup enzyme's react adapter
Enzyme.configure({ adapter: new EnzymeAdapter() })

expect.extend({
  hasOne(wrapper, el) {
    const pass = wrapper.find(el).length === 1
    if (pass) {
      return {
        message: () => `expected ${wrapper} to have ${el}`,
        pass: true,
      }
    } else {
      return {
        message: () => `expected ${wrapper} to not have ${el}`,
        pass: false,
      }
    }
  },
})

global.wrapperHas = (app, count = 1) => (el) => {
  expect(app.find(el).length === count).toEqual(true)
}
