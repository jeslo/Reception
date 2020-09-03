import {StyleSheet} from 'react-native'
import {Colors, Fonts} from '../../Themes'
export const styles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 5
  },
  checkBox: {
    borderColor: Colors.banner,
    color: Colors.buttonColor,
    width: 14,
    height: 14,
    borderWidth: 1,
    backgroundColor: Colors.rbcwhite,
    marginRight: 5,
    marginTop: 2
  },
  
  checkBoxError: {
    borderColor: Colors.error
  },
  textStyle: {
    color: 'white'
  },
  textStyleError: {
    color: Colors.error
  }
})
