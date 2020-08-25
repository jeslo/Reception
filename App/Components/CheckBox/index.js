import React from 'react'
import {View, Text} from 'react-native'
import {styles} from './styles'
import Touchable from '../../Components/Touchable'
import OptionalView from '../../Components/OptionalView'
export default class Checkbox extends React.Component {
  render () {
    return (
      <Touchable onPress={this.props.onPress}>
        <View style={styles.container}>
          <View
            style={[
              styles.checkBox,
              this.props.mark === '' ? styles.checkBoxError : styles.checkBox,
            ]}>
            <OptionalView>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 8,
                }}>
                {this.props.mark}
              </Text>
            </OptionalView>
          </View>
          <Text
            style={[
              styles.textStyle,
              this.props.mark === '' ? styles.textStyleError : styles.textStyle,
            ]}>
            {this.props.checkBoxLabel}
          </Text>
        </View>
      </Touchable>
    )
  }
}
