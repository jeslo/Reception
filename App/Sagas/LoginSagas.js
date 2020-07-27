import {put} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation'
import Actions from '../Redux/LoginRedux'

const LOGIN_URL = 'http://crmservice.rbcentre.com/api/CRMMobApp/CRMUserLogin'
const NOTIFICATION_URL = 'http://crmservice.rbcentre.com/api/CRMMobApp/getAllNotificationList'
const CHECKIN_CONFIRM_URL = 'http://crmservice.rbcentre.com/api/CRMMobApp/getAllNotificationList'
const CHECKIN_DECLINE_URL = 'http://crmservice.rbcentre.com/api/CRMMobApp/getAllNotificationList'

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
    .catch(e => console.tron.log('>>>>>>eeeee, e'))
  if (result.Flag === 1) {
    yield put(Actions.getLoginDetailsSuccess(result))
    yield put(Actions.getNotificationRequest())
  } else return yield put(Actions.getLoginDetailsFailure(result.Result))
}

export function * getNotifications(params) {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  }
  const result = yield fetch(NOTIFICATION_URL, postOptions)
    .then(resp => resp.json())
    .then(r => r)
    .catch(e => console.tron.log('>>>>>>eeeee, e'))
  if (result.Flag === 1) {
    yield put(Actions.getNotificationSuccess(result))
  } else return yield put(Actions.getNotificationFailure(result))
}

export function * checkinConfirm() {
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
    .catch(e => console.tron.log('>>>>>>eeeee, e'))
  if (result.Flag === 1) {
    yield put(Actions.getNotificationSuccess(result))
  } else return yield put(Actions.getNotificationFailure(result))
}
export function * checkinDecline() {
  const postOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(params),
  }
  const result = yield fetch(CHECKIN_DECLINE_URL, postOptions)
    .then(resp => resp.json())
    .then(r => r)
    .catch(e => console.tron.log('>>>>>>eeeee, e'))
  if (result.Flag === 1) {
    yield put(Actions.getCheckinDeclineSuccess(result))
  } else return yield put(Actions.getCheckinDeclineFailure(result))
}
