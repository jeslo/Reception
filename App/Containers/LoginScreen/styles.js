import {StyleSheet} from 'react-native'
import {Colors, Fonts} from '../../Themes'
export const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    marginTop: 200
   
  },
  logInBox: {
    marginTop: 20,
    backgroundColor: Colors.rbcblue,
    padding: 30,
    borderRadius: 20,
    alignSelf: 'stretch',
  },
  buttonText: {
    ...Fonts.style.normal,
    color: Colors.buttonColor
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.rbcgreen,
    borderRadius: 10,
    height: 44,
    borderColor: Colors.charcoal,
    borderWidth: 1,
    padding: 10,
    marginTop: 20
  },
  noNotifications: {
    
    padding: 50,
    backgroundColor: 'orange',
    color: 'white',
    fontWeight: '900',
    borderRadius: 10,
    textAlign: 'center',
    overflow: 'hidden',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 100,
    
  },
  errorText: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#e83a30',
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    borderRadius: 10,
    textAlign: 'center',
    overflow: 'hidden'
  },
  error: {
    ...Fonts.style.small,
    color: Colors.error,
    marginRight: 5,
    textAlign: 'right'
  },
  cellItem: {
    ...Fonts.style.normal,
    flex: 4,
    flexDirection: 'column',
    padding: 8,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: Colors.rbcblue
    
},
textAreaView: {
  flex: 1,
  alignItems: 'center',
  paddingTop: 2,
  paddingBottom: 5
},
textareaContainer: {
  height: 50,
  padding: 5,
  borderRadius: 10,
  backgroundColor: '#F5FCFF',
},
textarea: {
  textAlignVertical: 'top',
  height: 170,
  fontSize: 14,
  color: '#333',
  
},
cellItemDetailsText: {
  ...Fonts.style.normal,
  fontWeight: 'bold',
  
  
}
})
