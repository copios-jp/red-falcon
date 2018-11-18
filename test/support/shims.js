window.require = (lib) => {
  switch (lib) {
    case 'usb':
      return {}
    case 'ant-plus':
      return {}
    default:
      return {}
  }
}

import { expect } from 'chai'
global.expect = expect

import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
