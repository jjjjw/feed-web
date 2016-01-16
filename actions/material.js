import request from 'superagent'
import { createAction } from 'redux-actions'

const ActionCreators = {
  createMaterial: createAction('CREATE_MATERIAL')
}

export function createMaterial (material) {
  return (dispatch, getState) => {
    const baseUrl = getState().config.urls.apiBase
    const { content } = material

    request
      .post(`${baseUrl}/material`)
      .send({ content })
      .end((err, res) => {
        if (err) {
          throw err
        } else if (res.ok) {
          const { id } = res.body.material
          dispatch(ActionCreators.createMaterial({ id, content }))
        }
      })
  }
}
