jest.mock('../../services/ipc', () => ({
  bind: jest.fn()
}))

import React from 'react'
import { shallow } from 'enzyme'
import { Footer } from './'
import { bind } from '../../services/ipc'

describe('Footer', () => {

  const classes = {
    root: 'root',
    copyright: 'copy',
    item: 'item'
  }

  const footer = shallow(<Footer classes={classes}/>)

  describe('composition', () => {
    it('has a copyright', () => {
      expect(footer.childAt(0).hasClass(classes.copyright)).toBe(true)
      expect(footer.childAt(0).prop('aria-label')).toEqual('copyright')
    })

    it('has a count of receivers', () => {
      expect(footer.childAt(1).hasClass(classes.item)).toBe(true)
      expect(footer.childAt(1).prop('aria-label')).toEqual('receiver count')
    })

    it('has a count of transmitters', () => {
      expect(footer.childAt(2).hasClass(classes.item)).toBe(true)
      expect(footer.childAt(2).prop('aria-label')).toEqual('transmitter count')
    })
  })

  describe('lifecycle', () => {
    describe('componentDidMount', () => {
      it('binds ipc events', () => {
        expect(bind).toBeCalledWith('on', footer.instance()._ipcEvents)
      })
    })

    describe('componentWillUnmount', () => {
      it('binds ipc events', () => {
        footer.instance().componentWillUnmount()
        expect(bind).toBeCalledWith('off', footer.instance()._ipcEvents)
      })
    })
  })

  describe('event handlers', () => {
    describe('onAntEvent', () => {
      it('updates state', () => {
        footer.instance().onAntEvent('transmitter:added', {transmitter: 1, transmitters: [1] })
        expect(footer.state('transmitter')).toEqual(1)
        expect(footer.state('transmitters')).toEqual([1])
      })
    })

    describe('onVersion', () => {
      it('updates state', () => {
        footer.instance().onVersion('version', 123)
        expect(footer.state('version')).toEqual(123)
      })
    })
  })
})



