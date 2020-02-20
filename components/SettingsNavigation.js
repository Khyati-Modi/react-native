import React, {Component} from 'react';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ProfileComponent from './ProfileComponent';
import {DrawerItems} from 'react-navigation-drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default class SettingsNavigation extends Component {
  render() {
    return <DrawerNavigation />;
  }
}

const DrawerNavigation = createDrawerNavigator(
  {
    ProfileScreen: {
      screen: ProfileComponent,
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
                      props.navigation.navigate('LoginComponent');
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
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
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