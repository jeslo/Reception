import {put} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation'
import Actions from '../Redux/LoginRedux'

const LOGIN_URL = 'http://crmservice.rbcentre.com/api/CRMMobApp/StaffLogInByPhone'
const NOTIFICATION_URL = 'http://crmservice.rbcentre.com/api/CRMMobApp/GetNotifications'
const CHECKIN_CONFIRM_URL = 'http://crmservice.rbcentre.com/api/CRMMobApp/ConfirmCheckIn'
const LOG_OUT = 'http://crmservice.rbcentre.com/api/CRMMobApp/StaffLogOut'


export function * getLoginData ({params}) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
    
  }
  const result = yield fetch(LOGIN_URL, postOptions)
    .then(resp => resp.json())
    .then(r => r)
    .catch(e => console.tron.log('>>>>>>eeeee', e))
  if (result.Flag === 1) {
    yield put(Actions.getLoginDetailsSuccess(result))
    yield put(Actions.getNotificationRequest())
  } else return yield put(Actions.getLoginDetailsFailure(result.Result))
}
export function * getLogOut({params}) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  }
  const result = yield fetch(LOG_OUT, postOptions)
    .then(resp => resp.json())
    .then(r => r)
    .catch(e => console.tron.log('>>>>>>eeeee, e'))
  if (result.Flag === 1) {
    yield put(Actions.logoutUserSuccess(result))
  } 
  else if (result.Flag === 2) return yield put(Actions.logoutUseFailure(result.Result))
  else return yield put(Actions.logoutUseFailure(result))
}

export function * getNotifications() {
  const postOptions = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(),
  }
  const result = yield fetch(NOTIFICATION_URL, postOptions)
    .then(resp => resp.json())
    .then(r => r)
    .catch(e => console.tron.log('>>>>>>eeeee, e'))
  if (result.Flag === 1) {
    yield put(Actions.getNotificationSuccess(result))
  } 
  else if (result.Flag === 2) return yield put(Actions.getNotificationFailure(result.Result))
  else return yield put(Actions.getNotificationFailure(result))
}

export function * checkinConfirmOrDecline({params,index}) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  }
  const result = yield fetch(CHECKIN_CONFIRM_URL, postOptions)
    .then(resp => resp.json())
    .then(r => r)
    .catch(e => console.tron.log('>>>>>>eeeee', e))
  if (result.Flag === '1') 
  {
   yield put(Actions.getCheckinConfirm(result))
   yield put(Actions.getNotificationRequest())
  }
  else if (result.Flag === '2')
  { 
    yield put(Actions.getCheckinDecline(result))
    yield put(Actions.getNotificationRequest())
  }
  else 
  {
     yield put(Actions.getCheckinFailed(result.Result,index))
  }
}

