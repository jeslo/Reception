import {createActions, createReducer} from 'reduxsauce'
import Immutable from 'seamless-immutable'

const {Types, Creators} = createActions({
  getLoginDetailsRequest: ['params'],
  getLoginDetailsSuccess: ['data'],
  getLoginDetailsFailure: ['data'],

  getNotificationRequest: [],
  getNotificationSuccess: ['data'],
  getNotificationFailure: ['data'],

  getConfirmCheckinRequest: ['params','index'],
  getCheckinConfirm: ['data'],
  getCheckinDecline: ['data'],
  getCheckinFailed: ['data','index'],

  updateFirstLevelKey: ['key', 'value'],
  getUpdatePhone: ['key', 'value'],
  getUpdateCustomerRemark: ['key', 'value', 'index'],
  updateCheckBoxValue: ['data'],

  logoutUser: ['params'],
  logoutUserSuccess: ['data'],
  logoutUseFailure: ['data'],

  loginFlag: [],
})
export const loginTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  loginDetails: {},
  loginLoader: {},
  loginFailed: '',
  notificationDetails: {},
  confimCheckinStatus: '',
  notificationFailureMessage: '',
  checkBoxFlag: false,
  validPage: false,
  phone: {
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
    loader: true,
  })
export const handleLoginSuccess = (state, {data}) =>
   state.merge({
    loginDetails: data,
    validPage: true,
    loader: false
  })

export const handleLoginfailure = (state, {data}) =>
  state.merge({
    loginFailed: data,
    loader: false,
    validPage: false,
    checkBoxFlag: false
  })

export const handleNotificationRequest = (state, {data}) =>
  state.merge({
    loader: true,
  })
export const handleNotificationSuccess = (state, {data}) =>
  state.merge({
    notificationDetails: data,
    loader: false,
    notificationFailureMessage: ''
  })
export const handleNotificationfailure = (state, {data}) =>
  state.merge({
    notificationFailureMessage: data,
    loader: false,
  })

export const handleConfirmCheckinRequest = (state, {data}) =>
  state.merge({
    loader: true,
  })
export const handleCheckinConfirm = (state, {data}) =>
  state.merge({
    confimCheckinStatus: data,
    loader: false,
  })
export const handleCheckinDecline = (state, {data}) =>
  state.merge({
    confimCheckinStatus: data,
    loader: false,
  })
export const handleCheckinfailure = (state, {data,index}) =>{
  const checkinError = Immutable.asMutable(
    state.notificationDetails.NotificationList,
    {deep: true}
  )
  checkinError[index] = {
    ...checkinError[index],
    confimCheckinStatus: data,
    
  }
  return state.merge({
    loader: false,
    notificationDetails: state.notificationDetails.merge({
      NotificationList: Immutable(checkinError),
      
    })
  })
}
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
export const handleupdatePhone = (state, {key, value}) =>
  state.merge({
    phone: state.phone.merge({
      [key]: value,
      error: key === 'error' ? value : '',
    }),
    loginFailed: ''
  })
export const updateFirstLevelKey = (state, {key, value}) =>
  state.merge({
    [key]: value,
  })
export const handleGetLogin = (state, {status}) =>
  state.merge({
    loginFailed: '',
  })
export const handleCheckBox = (state, {data}) =>
  state.merge({
    checkBoxFlag: data
  })
export const handleLogoutUserSuccess = state => INITIAL_STATE

export const handleLogoutUser = (state) =>
  state.merge({
    loader: true,
  })
export const handleLogoutUserFailure = (state, {data}) =>
  state.merge({
    loader: false,
  })

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LOGIN_DETAILS_REQUEST]: setLoader,
  [Types.GET_LOGIN_DETAILS_SUCCESS]: handleLoginSuccess,
  [Types.GET_LOGIN_DETAILS_FAILURE]: handleLoginfailure,

  [Types.GET_NOTIFICATION_REQUEST]: handleNotificationRequest,
  [Types.GET_NOTIFICATION_SUCCESS]: handleNotificationSuccess,
  [Types.GET_NOTIFICATION_FAILURE]: handleNotificationfailure,

  [Types.GET_CONFIRM_CHECKIN_REQUEST]: handleConfirmCheckinRequest,
  [Types.GET_CHECKIN_CONFIRM]: handleCheckinConfirm,
  [Types.GET_CHECKIN_DECLINE]: handleCheckinDecline,
  [Types.GET_CHECKIN_FAILED]: handleCheckinfailure,


  [Types.UPDATE_FIRST_LEVEL_KEY]: updateFirstLevelKey,
  [Types.GET_UPDATE_PHONE]: handleupdatePhone,
  [Types.LOGIN_FLAG]: handleGetLogin,

  [Types.LOGOUT_USER]: handleLogoutUser,
  [Types.LOGOUT_USER_SUCCESS]: handleLogoutUserSuccess,
  [Types.LOGOUT_USE_FAILURE]: handleLogoutUserFailure,

  [Types.UPDATE_CHECK_BOX_VALUE]: handleCheckBox,
  [Types.GET_UPDATE_CUSTOMER_REMARK]: handleUpdateCustomerRemark,
})
