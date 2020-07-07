import React, {Component} from 'react'
import {View, ScrollView} from 'react-native'
import InputText from '../../Components/InputText'
//import Loader from '../../Components/Loader'
import {styles} from './styles'

// Style

export default class LoginScreen extends Component {
  render () {
    return (
      <ScrollView> 
        <View style={styles.conatiner}>
          <View style={styles.logInBox}>
            <InputText />
            <InputText />
          </View>
        </View>
      </ScrollView>
    )
  }
}
