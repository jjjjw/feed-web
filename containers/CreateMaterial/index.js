import * as materialActions from '../../actions/material'
import EditorComponent from '../../components/Editor'
import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export default class CreateMaterial extends React.Component {
  render () {
    return (
      <EditorComponent {...this.props} />
    )
  }
}

export default connect(null, dispatch => {
  const actions = bindActionCreators(materialActions, dispatch)
  return actions
})(CreateMaterial)
