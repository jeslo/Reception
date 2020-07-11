import {takeLatest, all} from 'redux-saga/effects'

/* ------------- Types ------------- */

import {loginTypes} from '../Redux/LoginRedux'
/* ------------- Sagas ------------- */
import { getLoginData } from './LoginSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(loginTypes.GET_LOGIN_DETAILS_REQUEST, getLoginData)
  ])
}
