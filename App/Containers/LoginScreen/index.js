import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native'
import Textarea from 'react-native-textarea'
import InputText from '../../Components/InputText'
import TextButton from '../../Components/Button'
import {connect} from 'react-redux'
import Actions from '../../Redux/LoginRedux'
import {empty} from '../../Transforms/ConvertFromKelvin'
import OptionalView from '../../Components/OptionalView'
import Loader from '../../Components/Loader'
import TouchableOpacity from '../../Components/Touchable'
import Checkbox from '../../Components/CheckBox'
import _ from 'lodash'
import {styles} from './styles'
import Moment from 'moment'


console.disableYellowBox = true

class LoginScreen extends Component {
  state = {
    show: false,
    item: {},
  }
  fetchLogin = () => {
    if (this.props.checkBoxFlag) {
      this.props.getLoginData({
        Phone: this.props.phone,
      })
    } else {
    }
  }

  logOut = () => {
    this.props.navigation.goBack()
    this.props.logOut({
      // StaffId: this.props.userID,
      phone: this.props.phone,
    })
  }
  checkBoxSet = () => {
    this.props.updateCheckBox(!this.props.checkBoxFlag)
  }
  refreshNotifications = () => {
    this.props.refreshNotification()
  }

  validatePhone = () => {
    if (!empty(this.props.phone)) {
      this.props.updatePhoneNumber('error', 'Phone number can not be empty')
    }
  }

  validateCustomerRemark = index => () => {
    if (!empty(this.props.notificationDetails.value)) {
      this.props.updateCustomerRemark(
        'error',
        this.props.notificationDetails.value,
        index,
      )
    }
  }
  onChangePhoneNumber = text => {
    this.props.updatePhoneNumber('value', text)
  }
  onCustomerRemark = index => text => {
    this.props.updateCustomerRemark('value', text, index)
  }
  renderNotifications = () => {
    if (this.props.notificationFailed)
      return (
        <Text style={styles.noNotifications}>
          {this.props.notificationFailed}
        </Text>
      )
    else {
      return (
        <FlatList
          style={{
            paddingLeft: 10,
            paddingRight: 10,
          }}
          scrollEventThrottle={true}
          ItemSeparatorComponent={() => <View style={{margin: 10}} />}
          data={this.props.notificationDetails}
          renderItem={this.renderItem}
        />
      )
    }
  }

  renderItem = ({item, index}) => {
    var validitydate = Moment(item.ValidityDate).format('MMM Do YYYY')

    return (
      <View style={styles.cellItem}>
        <Text>
          Customer Name: &nbsp;{' '}
          <Text style={styles.cellItemDetailsText}>
            {_.get(item, 'UserName', '')}
          </Text>
        </Text>
        <Text>
          Mobile Number:&nbsp;{' '}
          <Text style={styles.cellItemDetailsText}>
            {_.get(item, 'Phone', '')}
          </Text>
        </Text>
        <Text>
          Validty Date: &nbsp;{' '}
          <Text style={styles.cellItemDetailsText}>{validitydate}</Text>
        </Text>
        <Text>
          Activity Name: &nbsp;{' '}
          <Text style={styles.cellItemDetailsText}>
            {_.get(item, 'productName', '')}
          </Text>
        </Text>
        <Text>
          Dues: &nbsp;{' '}
          <Text style={styles.cellItemDetailsText}>
            {_.get(item, 'duesAmount', '')}
          </Text>
        </Text>
        <View style={styles.textAreaView}>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            onChangeText={this.onCustomerRemark(index)}
            maxLength={200}
            placeholder={'Enter Comment'}
            placeholderTextColor={'#c7c7c7'}
            underlineColorAndroid={'transparent'}
            value={item.value === '' ? null : item.value}
            onBlur={this.validateCustomerRemark(index)}
          />

          <OptionalView hide={!item.confimCheckinStatus}>
            <Text style={styles.error}>{item.confimCheckinStatus}</Text>
          </OptionalView>
        </View>
        <View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TextButton
              buttonName='Confirm'
              onPress={this.props.checkinConfirmOrDecline(
                {
                  ActionId: 1,
                  CheckId: _.get(item, 'CheckId', ''),
                  CustomerId: _.get(item, 'UserId', ''),
                  CustomerName: _.get(item, 'UserName', ''),
                  Phone: _.get(item, 'Phone', ''),
                  Comment: item.value === '' ? null : item.value,
                  UserName: this.props.userName,
                },
                index,
              )}
              style={{flex: 1, flexDirection: 'row', marginRight: 5}}
            />
            <TextButton
              buttonName='Decline'
              onPress={this.props.checkinConfirmOrDecline(
                {
                  ActionId: 2,
                  CheckId: _.get(item, 'CheckId', ''),
                  CustomerId: _.get(item, 'UserId', ''),
                  CustomerName: _.get(item, 'UserName', ''),
                  Phone: _.get(item, 'Phone', ''),
                  Comment: item.value === '' ? null : item.value,
                  UserName: this.props.userName,
                },
                index,
              )}
              style={{flex: 1, flexDirection: 'row', marginLeft: 5}}
            />
          </View>
        </View>
      </View>
    )
  }
  render () {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <OptionalView hide={this.props.validPage}>
            <View style={styles.conatiner}>
              <Image
                source={require('./Image/RBClogo.png')}
                style={{
                  height: 100,
                  width: 100,
                  resizeMode: 'contain',
                }}
              />
              <View style={styles.logInBox}>
                <InputText
                  onChangeText={this.onChangePhoneNumber}
                  placeholder='Enter phone number'
                  value={this.props.phone}
                  error={this.props.phoneError}
                  onBlur={this.validatePhone}
                  keyboardType
                />
                <Checkbox
                  checkBoxLabel='I am in charge of front office now'
                  mark={this.props.checkBoxFlag === true ? '✔' : ''}
                  notChecked={true}
                  onPress={this.checkBoxSet}></Checkbox>
                <OptionalView hide={!this.props.loader}>
                  <Loader />
                </OptionalView>
                <OptionalView hide={!this.props.loginFailed}>
                  <Text style={styles.errorText}>User not found.!</Text>
                </OptionalView>

                <TextButton
                  buttonName='Login'
                  onPress={this.fetchLogin}></TextButton>
              </View>
            </View>
          </OptionalView>
          <OptionalView hide={!this.props.validPage}>
            <SafeAreaView>
              <View
                style={{
                  paddingLeft: 10,
                  paddingBottom: 10,
                  paddingTop: 10,
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <TextButton
                  buttonName='Logout'
                  onPress={this.logOut}></TextButton>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row-reverse',
                    paddingLeft: 10,
                    height: 50,
                    width: 30,
                  }}>
                  <OptionalView hide={this.props.loader}>
                    <TouchableOpacity onPress={this.refreshNotifications}>
                      <Image
                        source={require('./Image/refresh.png')}
                        style={{
                          height: 50,
                          width: 30,
                          resizeMode: 'contain',
                        }}
                      />
                    </TouchableOpacity>
                  </OptionalView>
                  <OptionalView hide={!this.props.loader}>
                    <Loader style={{height: 50, width: 30}} />
                  </OptionalView>
                </View>
              </View>
              <this.renderNotifications />
            </SafeAreaView>
          </OptionalView>
        </ScrollView>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  isLogin: state.login.isLogin,

  loginFailed: state.login.loginFailed,
  loader: state.login.loader,
  validPage: state.login.validPage,
  notificationFailed: state.login.notificationFailureMessage,
  checkBoxFlag: state.login.checkBoxFlag,

  CommentText: _.get(
    state,
    'login.notificationDetails.NotificationList.value',
    '',
  ),
  userName: _.get(state, 'login.loginDetails.result.Username', ''),
  userID: _.get(state, 'login.loginDetails.result.UserId', ''),
  notificationDetails: _.get(
    state,
    'login.notificationDetails.NotificationList',
    '',
  ),

  phone: state.login.phone.value,
  phoneError: state.login.phone.error,
})

const mapDispatchToProps = dispatch => ({
  getLoginData: params => dispatch(Actions.getLoginDetailsRequest(params)),

  updateUserName: (key, value) =>
    dispatch(Actions.getUpdateUserName(key, value)),

  updatePassword: (key, value) =>
    dispatch(Actions.getUpdatePassword(key, value)),

  updatePhoneNumber: (key, value) =>
    dispatch(Actions.getUpdatePhone(key, value)),

  updateCustomerRemark: (key, value, index) =>
    dispatch(Actions.getUpdateCustomerRemark(key, value, index)),

  updateFirstLevelKey: (key, value) =>
    dispatch(Actions.updateFirstLevelKey(key, value)),
  logOut: params => dispatch(Actions.logoutUser(params)),
  updateCheckBox: data => dispatch(Actions.updateCheckBoxValue(data)),
  refreshNotification: () => dispatch(Actions.getNotificationRequest()),

  checkinConfirmOrDecline: (params, index) => () =>
    dispatch(Actions.getConfirmCheckinRequest(params, index)),

  setLoginStatus: value => () => dispatch(Actions.loginFlag(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
