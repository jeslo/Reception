import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  getLoginDetailsRequest: ['params'],
  getLoginDetailsSuccess: ['data'],
  getLoginDetailsFailure: ['data'],

  getNotificationRequest: [],
  getNotificationSuccess: ['data'],
  getNotificationFailure: ['data'],

  getConfirmCheckinRequest: ['params'],
  getConfirmCheckinSuccess: ['data'],
  getConfirmCheckinFailure: ['data'],

  getCheckinDeclineRequest: ['params'],
  getCheckinDeclineSuccess: ['data'],
  getCheckinDeclineFailure: ['data'],

  updateFirstLevelKey: ['key', 'value'],
  getUpdateUserName: ['key', 'value'],
  getUpdatePassword: ['key', 'value'],
  getUpdateCustomerRemark: ['key', 'value', 'index'],

  logoutUser: [],
  loginFlag: [],
})
export const loginTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loginDetails: {},
  loginLoader: {},
  loginFailed: '',
  notificationDetails: {},
  confimCheckinStatus: {},

  validPage: false,

  userName: {
    value: '',
    error: '',
  },
  password: {
    value: '',
    error: '',
  },
  customerRemark: {
    value: '',
    error: '',
  },
})

/* ---------------------Reducers---------------------- */
export const setLoader = state =>
  state.merge({
    loginLoader: true,
  })
export const handleLoginSuccess = (state, {data}) =>
  state.merge({
    loginDetails: data,
    validPage: true,
  })

export const handleLoginfailure = (state, {data}) =>
  state.merge({
    loginFailed: data,
    loader: false,
    validPage: false,
  })

export const handleNotificationRequest = (state, {data}) =>
  state.merge({
    loader: false,
  })
export const handleNotificationSuccess = (state, {data}) =>
  state.merge({
    notificationDetails: data,
    loader: false,
  })
export const handleNotificationfailure = (state, {data}) =>
  state.merge({
    notificationDetails: data,
    loader: false,
  })

export const handleConfirmCheckinRequest = (state, {data}) =>
  state.merge({
    loader: false,
  })
export const handleConfirmCheckinSuccess = (state, {data}) =>
  state.merge({
    confimCheckinStatus: data,
    loader: false,
  })
export const handleConfirmCheckinfailure = (state, {data}) =>
  state.merge({
    confimCheckinStatus: data,
    loader: false,
  })

export const handleCheckinDeclineRequest = (state, {data}) =>
  state.merge({
    loader: false,
  })
export const handleCheckinDeclineSuccess = (state, {data}) =>
  state.merge({
    declineCheckinStatus: data,
    loader: false,
  })
export const handleCheckinDeclinefailure = (state, {data}) =>
  state.merge({
    declineCheckinStatus: data,
    loader: false,
  })

export const updateFirstLevelKey = (state, {key, value}) =>
  state.merge({
    [key]: value,
  })

export const handleupdateUserName = (state, {key, value}) =>
  state.merge({
    userName: state.userName.merge({
      [key]: value,
      error: key === 'error' ? value : '',
    }),
  })

export const handleupdatePassword = (state, {key, value}) =>
  state.merge({
    password: state.password.merge({
      [key]: value,
      error: key === 'error' ? value : '',
    }),
  })
export const handleUpdateCustomerRemark = (state, {key, value, index}) => {
  const notifications = Immutable.asMutable(
    state.notificationDetails.NotificationList,
    {deep: true},
  )
  notifications[index] = {
    ...notifications[index],
    [key]: value,
    error: key === 'error' ? value : '',
  }
  return state.merge({
    notificationDetails: state.notificationDetails.merge({
      NotificationList: Immutable(notifications),
    }),
  })
}
export const handleGetLogin = (state, {status}) =>
  state.merge({
    loginFailed: '',
  })
export const handleLogoutUser = state => INITIAL_STATE

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LOGIN_DETAILS_REQUEST]: setLoader,
  [Types.GET_LOGIN_DETAILS_SUCCESS]: handleLoginSuccess,
  [Types.GET_LOGIN_DETAILS_FAILURE]: handleLoginfailure,

  [Types.GET_NOTIFICATION_REQUEST]: handleNotificationRequest,
  [Types.GET_NOTIFICATION_SUCCESS]: handleNotificationSuccess,
  [Types.GET_NOTIFICATION_FAILURE]: handleNotificationfailure,

  [Types.GET_CONFIRM_CHECKIN_REQUEST]: handleConfirmCheckinRequest,
  [Types.GET_CONFIRM_CHECKIN_SUCCESS]: handleConfirmCheckinSuccess,
  [Types.GET_CONFIRM_CHECKIN_FAILURE]: handleConfirmCheckinfailure,

  [Types.GET_CHECKIN_DECLINE_REQUEST]: handleCheckinDeclineRequest,
  [Types.GET_CHECKIN_DECLINE_SUCCESS]: handleCheckinDeclineSuccess,
  [Types.GET_CHECKIN_DECLINE_FAILURE]: handleCheckinDeclinefailure,

  [Types.UPDATE_FIRST_LEVEL_KEY]: updateFirstLevelKey,
  [Types.GET_UPDATE_USER_NAME]: handleupdateUserName,
  [Types.GET_UPDATE_PASSWORD]: handleupdatePassword,
  [Types.LOGIN_FLAG]: handleGetLogin,
  [Types.LOGOUT_USER]: handleLogoutUser,
  [Types.GET_UPDATE_CUSTOMER_REMARK]: handleUpdateCustomerRemark,
})
