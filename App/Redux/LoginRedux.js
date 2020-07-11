import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  getLoginDetailsRequest: ['params'],
  getLoginDetailsSuccess: ['data'],
  getLoginDetailsFailure: ['data'],

  updateFirstLevelKey: ['key', 'value'],
  getUpdateUserName: ['key', 'value'],
  getUpdatePassword: ['key', 'value'],
  loginFlag: []
})
export const loginTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loginDetails: {},
  loginLoader: {},
  loginFailed: '',

  userName: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
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
    loginFailed: data,
    loader: false
  })
  export const updateFirstLevelKey = (state, { key, value }) =>
  state.merge({
    [key]: value
  })

  export const handleupdateUserName = (state, { key, value }) =>
   state.merge({
    userName: state.userName.merge({
      [key]: value,
      error: key === 'error' ? value : '',
    }),
  })

  export const handleupdatePassword = (state, { key, value }) =>
   state.merge({
    password: state.password.merge({
      [key]: value,
      error: key === 'error' ? value : '',
    }),
  })
  export const handleGetLogin = (state, {status}) =>
  state.merge({
    loginFailed: ''
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LOGIN_DETAILS_REQUEST]: setLoader,
  [Types.GET_LOGIN_DETAILS_FAILURE]: handleLoginSuccess,
  [Types.GET_LOGIN_DETAILS_FAILURE]: handleLoginfailure,

  [Types.UPDATE_FIRST_LEVEL_KEY]: updateFirstLevelKey,
  [Types.GET_UPDATE_USER_NAME]: handleupdateUserName,
  [Types.GET_UPDATE_PASSWORD]: handleupdatePassword,
  [Types.LOGIN_FLAG]: handleGetLogin
})
