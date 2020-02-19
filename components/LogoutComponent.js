import React, {Component} from 'react';
import {View, Alert, Text} from 'react-native';

export default class LogoutComponent extends Component {
  componentDidMount() {
    console.log('===========================');
    console.log('called Logout comopent');
    console.log('===========================');

    this.onLogout();
  }
  render() {
    return (
      <View>
        <Text>Add New Recipe</Text>
      </View>
    );
  }

  onLogout = () => {
    console.log('===========================');
    console.log('Session Logout');
    console.log('===========================');

    // Alert.alert('Are you sure you want to logout', [
    //   {
    //     text: 'No',
    //     onPress: this.goToHomePage,
    //   },
    // ]);
  };

  goToLoginPage = () => {
    this.props.navigation.navigate('LoginScreen');
  };
}
