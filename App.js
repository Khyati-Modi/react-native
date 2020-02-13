import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import SplashScreen from './components/SplashScreen';
import LoginComponent from './components/LoginComponent';
import MainScreen from './components/MainScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
          header: null,
        },
      },
      LoginComponent: {
        screen: LoginComponent,
        navigationOptions: {
          header: null,
        },
      },
      MainScreen: {
        screen: MainScreen,
        navigationOptions: {
          header: null,
        },
      },
    },
    {
      mode: 'modal',
    },
  ),
);
