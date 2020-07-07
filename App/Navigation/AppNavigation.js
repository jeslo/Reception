import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginScreen from '../Containers/LoginScreen'
import NotificationScreen from '../Containers/NotificationScreen'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator(
  {
    LoginScreen: {screen: LoginScreen},
    NotificationScreen: {screen: NotificationScreen}
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      headerStyle: styles.header
    }
  }
)

export default createAppContainer(PrimaryNav)
