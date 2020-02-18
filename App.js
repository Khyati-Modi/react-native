import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import SplashScreen from './components/SplashScreen';
import LoginComponent from './components/LoginComponent';
import MainScreen from './components/MainScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      SplashScreen: {
        screen: SplashScreen,
      },
      LoginComponent: {
        screen: LoginComponent,
      },
      MainScreen: {
        screen: MainScreen,
      },
    },
    {
      mode: 'modal',
    },
  ),
);
