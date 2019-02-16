jest.mock('../../services/ipc', () => ({
  Activate: jest.fn(),
  Deactivate: jest.fn(),
}))

import React from 'react'
import { shallow } from 'enzyme'
import { AppBar } from './'
import { AppBar as Bar, IconButton } from '@material-ui/core'
import { Activate, Deactivate } from '../../services/ipc'

describe('AppBar', () => {
  const classes = {
    root: '1',
    buttonBar: '2',
    powerButtonOn: '3',
    powerButtonOff: '4',
  }

  const appBar = shallow(<AppBar classes={classes} />)

  describe('composition', () => {
    it('has a Bar component classed root', () => {
      expect(appBar).hasOne(Bar)
      expect(appBar.hasClass(classes.root)).toEqual(true)
    })

    it('wraps as buttonBar classed element', () => {
      expect(appBar.childAt(0).hasClass(classes.buttonBar)).toBe(true)
    })

    it('has a button to edit the sensor list', () => {
      // TODO
    })

    it('has an Activate IconButton', () => {
      expect(appBar.childAt(0)).hasOne(IconButton)
      expect(
        appBar
          .childAt(0)
          .childAt(1)
          .prop('aria-label'),
      ).toEqual('Activate')
      expect(
        appBar
          .childAt(0)
          .childAt(1)
          .childAt(0)
          .hasClass(classes.powerButtonOff),
      ).toBe(true)
    })
  })

  describe('state', () => {
    it('is not active by default', () => {
      expect(appBar.state('isActivated')).toBe(false)
    })
  })

  describe('Activate button', () => {
    it('toggles activation', () => {
      const spy = jest.spyOn(appBar.instance(), 'toggleActivation')
      appBar
        .childAt(0)
        .childAt(1)
        .simulate('click')
      expect(spy).toHaveBeenCalled()
      spy.mockRestore()
    })
  })

  describe('toggle activation', () => {
    it('activates when deactivated', () => {
      appBar.setState({ isActivated: false })
      appBar.instance().toggleActivation()
      expect(Activate).toHaveBeenCalled()
      expect(appBar.state('isActivated')).toBe(true)
    })

    it('deactivates when activated', () => {
      appBar.setState({ isActivated: true })
      appBar.instance().toggleActivation()
      expect(Deactivate).toHaveBeenCalled()
      expect(appBar.state('isActivated')).toBe(false)
    })
  })
})
