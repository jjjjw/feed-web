/* global describe, it */

import expect from 'expect'
import React from 'react'
import Signup from '../../components/Signup'
import TestUtils from 'react-addons-test-utils'

function setup () {
  const props = {
    signup: expect.createSpy(),
    setEmail: function () {},
    setPassword: function () {}
  }

  const renderer = TestUtils.createRenderer()
  renderer.render(<Signup {...props} />)
  const output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe.skip('signup form', () => {
  it('renders correctly', () => {
    const { output } = setup()

    const [ title, form ] = output.props.children

    expect(title.type).toBe('div')
    expect(form.type).toBe('form')
  })

  it('calls signup on submit', () => {
    const { output, props } = setup()

    const form = output.props.children[1]
    const ev = { preventDefault: expect.createSpy() }

    form.props.onSubmit(ev)
    expect(props.signup.calls.length).toBe(1)
    expect(ev.preventDefault.calls.length).toBe(1)
    form.props.onSubmit(ev)
    expect(props.signup.calls.length).toBe(2)
    expect(ev.preventDefault.calls.length).toBe(2)
  })
})
