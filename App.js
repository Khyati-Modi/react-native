import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import SplashScreen from './components/SplashScreen';
import LoginComponent from './components/LoginComponent';
import MainScreen from './components/MainScreen';
import {Provider} from 'react-redux';
import store from './store';
import NavigationService from './components/NavigationService';
import { MenuProvider } from 'react-native-popup-menu';

const AppContainer = createAppContainer(
  createAppContainer(
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
  ),
);

export default function App() {
  return (
    <Provider store={store}>
      <MenuProvider>
      <AppContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
      </MenuProvider>
    </Provider>
  );
}
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;
