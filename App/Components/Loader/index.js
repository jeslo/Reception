import React from 'react'
import {ActivityIndicator, View} from 'react-native'

export default class Loader extends React.Component() {
  render () {
    return (
      <View>
        <ActivityIndicator size='large' color='#0000ff' animating={true} />
      </View>
    )
  }
}

