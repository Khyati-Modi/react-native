import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';

import RecipeList from './RecipeList';
import ProfileComponent from './ProfileComponent';
import AddRecipeComponent from './AddRecipeComponent';
import FavoriteComponent from './FavoriteComponent';
import SearchComponent from './SearchComponent';

export default class MainScreen extends Component {
  render() {
    return <AppContainer />;
  }
}

class ActvityScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Activitye</Text>
      </View>
    );
  }
}

class DetailScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Search Screen</Text>
      </View>
    );
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
      screen: DetailScreen,
      navigationOptions: ({navigation}) => ({
        // title: `${navigation.state.params.details.name}`,
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
const addPostNavigator = createStackNavigator(
  {
    AddPost: {
      screen: AddRecipeComponent,
      navigationOptions: ({navigation}) => ({
        title: 'Add Post',
      }),
    },
  },
  {
    mode: 'card',
  },
);

addPostNavigator.navigationOptions = ({navigation}) => {
  let tabBarVisible;
  if (navigation.state.routes.length > 0) {
    navigation.state.routes.map(route => {
      if (route.routeName === 'AddPost') {
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
      screen: ProfileComponent,
      navigationOptions: {
        title: 'Profile',

        // drawerIcon: (
        // //   <Image
        // //     source={require('../../images/userBlack.png')}
        // //     style={[{width: 19, height: 19, marginStart: 20}]}
        // //   />
        // ),
      },
    },
    Drawer: {
      screen: ActvityScreen,
      navigationOptions: {
        title: 'Activity',

        // drawerIcon: (
        //   <Image
        //     source={require('../../images/timer.png')}
        //     style={[{width: 19, height: 19, marginStart: 20}]}
        //   />
        // ),
      },
    },
  },
  {
    initialRouteName: 'ProfileScreen',
    drawerPosition: 'right',
    drawerType: 'slide',
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
      screen: RecipeList,
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
      screen: AddRecipeComponent,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <MaterialIcons name="add" size={30} color={tintColor} />
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
    // transfer : detailsNavigator
  },
  {
    initialRouteName: 'Home',
  },
);
const AppContainer = createAppContainer(bottomTabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    height: 19,
    width: 25,
    marginStart: 20,
  },
});
