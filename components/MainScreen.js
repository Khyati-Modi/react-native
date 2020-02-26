/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ProfileComponent from './ProfileComponent';
import {DrawerItems} from 'react-navigation-drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from './NavigationService';

import RecipeList from './RecipeList';
import LocationComponent from './LocationComponent';
import FavoriteComponent from './FavoriteComponent';
import SearchComponent from './SearchComponent';
import RecipeDetail from './RecipeDetail';
import EditProfileComponent from './EditProfileComponent';
import {View, SafeAreaView, TouchableOpacity, Text, Alert} from 'react-native';

export default class MainScreen extends Component {
  render() {
    return <AppContainer />;
  }
}

const homePageNavigator = createStackNavigator(
  {
    Posts: {
      screen: RecipeList,
      navigationOptions: {
        header: null,
      },
    },
    Details: {
      screen: RecipeDetail,
      navigationOptions: ({navigation}) => ({
        title: null,
      }),
    },
  },
  {
    mode: 'card',
  },
);

const profileNavigator = createStackNavigator(
  {
    Profile: {
      screen: ProfileComponent,
      navigationOptions: {
        header: null,
      },
    },
    Edit: {
      screen: EditProfileComponent,
      navigationOptions: ({navigation}) => ({
        title: null,
        header: null,
      }),
    },
  },
  {
    mode: 'card',
  },
);

homePageNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'Details') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

profileNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'Edit') {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
  };
};

const DrawerNavigation = createDrawerNavigator(
  {
    ProfileScreen: {
      screen: profileNavigator,
      navigationOptions: {
        title: '',
        drawerIcon: <AntDesign name="left" size={20} />,
      },
    },
  },
  {
    contentComponent: props => (
      <View style={{flex: 1}}>
        <SafeAreaView>
          <DrawerItems {...props} />
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Log out',
                'Do you want to logout?',
                [
                  {
                    text: 'No',
                    onPress: () => {
                      return null;
                    },
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      AsyncStorage.clear();
                      NavigationService.navigate('LoginComponent');
                    },
                  },
                ],
                {cancelable: false},
              )
            }>
            <Text style={{margin: 16, fontWeight: 'bold'}}>Logout</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    ),
    initialRouteName: 'ProfileScreen',
    drawerPosition: 'right',
    drawerType: 'slide',
  },
  {
    contentOptions: {
      inactiveTintColor: '#8E8E8E',
      activeTintColor: '#000000',
      labelStyle: {
        fontSize: 15,
      },
    },
  },
);

const bottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: homePageNavigator,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Fontisto name="home" size={22} color={tintColor} />
        ),
        tabBarLabel: () => {
          return null;
        },
      },
    },
    Search: {
      screen: SearchComponent,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Fontisto name="search" size={22} color={tintColor} />
        ),
        tabBarLabel: () => {
          return null;
        },
      },
    },
    Add: {
      screen: LocationComponent,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <Entypo name="location" size={30} color={tintColor} />
        ),
        tabBarLabel: () => {
          return null;
        },
      },
    },
    Favorites: {
      screen: FavoriteComponent,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <FontAwesome name="heart" size={22} color={tintColor} />
        ),
        tabBarLabel: () => {
          return null;
        },
      },
    },
    Profile: {
      screen: DrawerNavigation,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <MaterialIcons name="person-outline" size={28} color={tintColor} />
        ),
        tabBarLabel: () => {
          return null;
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);
const AppContainer = createAppContainer(bottomTabNavigator);
