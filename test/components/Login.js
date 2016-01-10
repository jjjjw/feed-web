/* global describe, it */

import expect from 'expect'
import React from 'react'
import Login from '../../components/Login'
import TestUtils from 'react-addons-test-utils'

function setup () {
  const props = {
    login: expect.createSpy(),
    setEmail: function () {},
    setPassword: function () {}
  }

  const renderer = TestUtils.createRenderer()
  renderer.render(<Login {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe.skip('login form', () => {
  it('renders correctly', () => {
    const { output } = setup()

    const [ title, form ] = output.props.children

    expect(title.type).toBe('div')
    expect(form.type).toBe('form')
  })

  it('calls login on submit', () => {
    const { output, props } = setup()

    const form = output.props.children[1]
    const ev = { preventDefault: expect.createSpy() }

    form.props.onSubmit(ev)
    expect(props.login.calls.length).toBe(1)
    expect(ev.preventDefault.calls.length).toBe(1)
    form.props.onSubmit(ev)
    expect(props.login.calls.length).toBe(2)
    expect(ev.preventDefault.calls.length).toBe(2)
  })
})
