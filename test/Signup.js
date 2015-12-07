/* global describe, it */

import expect from 'expect'
import React from 'react'
import Signup from '../components/Signup'
import TestUtils from 'react-addons-test-utils'

function setup () {
  let props = {
    signup: expect.createSpy()
  }

  let renderer = TestUtils.createRenderer()
  renderer.render(<Signup {...props} />)
  let output = renderer.getRenderOutput()

  return {
    props,
    output,
    renderer
  }
}

describe('signup form', () => {
  it('renders correctly', () => {
    let { output } = setup()

    let [ title, form ] = output.props.children

    expect(title.type).toBe('div')
    expect(form.type).toBe('form')
  })

  it('calls signup on submit', () => {
    let { output, props } = setup()

    let form = output.props.children[1]
    let ev = { preventDefault: expect.createSpy() }

    form.props.onSubmit(ev)
    expect(props.signup.calls.length).toBe(1)
    expect(ev.preventDefault.calls.length).toBe(1)
    form.props.onSubmit(ev)
    expect(props.signup.calls.length).toBe(2)
    expect(ev.preventDefault.calls.length).toBe(2)
  })
})
