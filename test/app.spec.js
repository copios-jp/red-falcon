import React from "react";
import { mount } from "enzyme";

import SensorsView from '../app/renderer/components/SensorsView'

describe('App', () => {
 let props
  let mountedComponent
  const sensorsView = () => {
    if (!mountedComponent) {
      mountedComponent = mount(
        <SensorsView {...props} />
      )
    }
    return mountedComponent
  }

  beforeEach(() => {
    props = {}
    mountedComponent = undefined
  })

  it('does stuff', () => {
    expect(sensorsView().find('div').length).to.eql(3)
  })
})
