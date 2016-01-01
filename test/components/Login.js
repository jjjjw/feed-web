/* global describe, it */

import expect from 'expect'
import React from 'react'
import Login from '../../components/Login'
import TestUtils from 'react-addons-test-utils'

function setup () {
  let props = {
    login: expect.createSpy(),
    setEmail: function () {},
    setPassword: function () {}
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Login {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe.skip('login form', () => {
  it('renders correctly', () => {
    let { output } = setup()

    let [ title, form ] = output.props.children

    expect(title.type).toBe('div')
    expect(form.type).toBe('form')
  })

  it('calls login on submit', () => {
    let { output, props } = setup()

    let form = output.props.children[1]
    let ev = { preventDefault: expect.createSpy() }

    form.props.onSubmit(ev)
    expect(props.login.calls.length).toBe(1)
    expect(ev.preventDefault.calls.length).toBe(1)
    form.props.onSubmit(ev)
    expect(props.login.calls.length).toBe(2)
    expect(ev.preventDefault.calls.length).toBe(2)
  })
})
