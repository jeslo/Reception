import React, {Component} from 'react'
import {View, ScrollView,Text} from 'react-native'
import InputText from '../../Components/InputText'
import TextButton from '../../Components/Button'
import {connect} from 'react-redux'
import Actions from '../../Redux/LoginRedux'
import {name, empty} from '../../Transforms/ConvertFromKelvin'
import OptionalView from '../../Components/OptionalView'
//import Loader from '../../Components/Loader'
import {styles} from './styles'

class LoginScreen extends Component {
  fetchLogin = () => {
    this.props.getLoginData({
      crmUserName: this.props.userName,
      crmPassword: this.props.password,
    })
  }

  validatePassword = () => {
    if (!empty(this.props.password)) {
      this.props.updatePassword('error', 'Password can not be empty')
    }
  }
  validateUsername = () => {
    if (!this.props.userName)
      return this.props.updateUserName('error', 'Enter username')
    if (!name(this.props.userName)) {
      this.props.updateUserName('error', 'Enter a valid user name')
    }
   }

  onChangeUserName = text => {
    this.props.updateFirstLevelKey('loginFailed', '')
    this.props.updateUserName('value', text)
  }
  onChangePassword = text => {
    this.props.updateFirstLevelKey('loginFailed', '')
    this.props.updatePassword('value', text)
  }
  render () {
    return (
      <View style={{flex: 1, backgroundColor: ''}}>
        <ScrollView>
          <View style={styles.conatiner}>
            <View style={styles.logInBox}>
              <InputText
                onChangeText={this.onChangeUserName}
                placeholder='Enter UserName'
                value={this.props.userName}
                error={this.props.userNameError}
               onBlur={this.validateUsername}
              />
              <InputText
                onChangeText={this.onChangePassword}
                placeholder={'Enter Password'}
                value={this.props.password}
                textContentType='password'
                onBlur={this.validatePassword}
                error={this.props.passwordError}
                password
              />
               <OptionalView hide={!this.props.loginFailed}>
                <Text style={styles.errorText}>{this.props.loginFailed}</Text>
              </OptionalView>
              <TextButton
                buttonName='Login'
               onPress={this.fetchLogin}
                ></TextButton>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  isLogin: state.login.isLogin,
  loginDetails: state.login.loginDetails,
  loginFailed: state.login.loginFailed,
  loader: state.login.loader,

  userName: state.login.userName.value,
  userNameError: state.login.userName.error,
  password: state.login.password.value,
  passwordError: state.login.password.error,
})

const mapDispatchToProps = dispatch => ({
  getLoginData: params => dispatch(Actions.getLoginDetailsRequest(params)),
  updateUserName: (key, value) =>
    dispatch(Actions.getUpdateUserName(key, value)),
  updatePassword: (key, value) =>
    dispatch(Actions.getUpdatePassword(key, value)),
  updateFirstLevelKey: (key, value) =>
    dispatch(Actions.updateFirstLevelKey(key, value)),

  setLoginStatus: value => () => dispatch(Actions.loginFlag(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
