import React from 'react'
import { mount } from 'enzyme'

import TopBar from './'

// comment to create fix release bump
describe('TopBar', () => {
  let props
  let mountedComponent
  const topBar = () => {
    if (!mountedComponent) {
      mountedComponent = mount(<TopBar {...props} />)
    }
    return mountedComponent
  }

  beforeEach(() => {
    props = {
      receivers: [],
    }
    mountedComponent = undefined
  })

  it('renders a div', () => {
    expect(topBar().find('div').length).toBe(1)
  })
})
