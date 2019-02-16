import React from 'react'
import { shallow } from 'enzyme'
import { App } from './'
import { AppBar, Main, Footer } from '../'

describe('App', () => {
  const app = shallow(<App classes={{ root: 'foo' }} />)

  it('renders AppBar', () => {
    expect(app).hasOne(AppBar)
  })

  it('wraps with a root classed element', () => {
    expect(app.hasClass('foo')).toEqual(true)
  })

  it('renders Main', () => {
    expect(app).hasOne(Main)
  })

  it('renders Footer', () => {
    expect(app).hasOne(Footer)
  })
})
