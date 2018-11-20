import React from 'react'
import { mount } from 'enzyme'

import TopBar from '../../app/renderer/components/TopBar'

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
    props = {}
    mountedComponent = undefined
  })

  it('renders a div', () => {
    expect(topBar().find('div').length).to.eql(2)
  })
})
