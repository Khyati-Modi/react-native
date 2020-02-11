import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoginComponent from './components/LoginComponent';
import MainScreen from './components/MainScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
      // SplashScreen: {
      //   screen: SplashScreen,
      //   navigationOptions: {
      //     header: null,
      //   },
      // },
      LoginPage: {
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
