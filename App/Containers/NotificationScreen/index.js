import React, {Component} from 'react'
import {Text, View} from 'react-native'

// Style

export default class NavigationScreen extends Component {
  render () {
    return (
      <View
        style={{flex: 1, backgroundColor: 'gray', justifyContent: 'center'}}>
        <Text>WELCOME</Text>
      </View>
    )
  }
}
