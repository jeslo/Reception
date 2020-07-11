import {put} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation'
import Actions from '../Redux/LoginRedux'

const LOGIN_URL = 'http://crmservice.rbcentre.com/api/CRMMobApp/CRMUserLogin'

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
  console.tron.log('>>>>>>>>>>', result );
  
  if (result.Flag === 1) {
    yield put(Actions.getLoginDetailsSuccess(result))
    yield put(NavigationActions.navigate({routeName: 'NotificationScreen'}))
  } else return yield put(Actions.getLoginDetailsFailure(result.Result))
}
