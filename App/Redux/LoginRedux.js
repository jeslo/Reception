import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  getLoginDetailsRequest: ['params'],
  getLoginDetailsSuccess: ['data'],
  getLoginDetailsFailure: [],
})
export const loginTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loginDetails: {},

  loginLoader: {}
})

/* ---------------------Reducers---------------------- */
export const setLoader = state =>
  state.merge({
    loginLoader: true
  })
export const handleLoginSuccess = (state, {data}) =>
  state.merge({
    loginDetails: data
  })

export const handleLoginfailure = (state, {data}) =>
  state.merge({
    loginDetails: data
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LOGIN_DETAILS_REQUEST]: setLoader,
  [Types.GET_LOGIN_DETAILS_SUCCESS]: handleLoginSuccess,
  [Types.GET_LOGIN_DETAILS_FAILURE]: handleLoginfailure
})
