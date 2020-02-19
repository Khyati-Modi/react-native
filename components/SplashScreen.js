import React, {Component} from 'react';
import {Text, View, Image, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as constant from './Constants';

export default class SplashScreen extends Component {
  constructor() {
    super();
    this.state = {name: ''};
  }
  componentDidMount() {
    this.retrieveData();
    setTimeout(() => {
      if (this.state.name === '') {
        // const {navigate} = this.props.navigation;
        this.props.navigation.navigate('LoginComponent');
      } else {
        // const {navigate} = this.props.navigation;
        this.props.navigation.navigate('MainScreen');
      }
    }, 2000);
    // this.props.navigation.navigate('LoginComponent');
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../images/instagram.png')}
          />
        </View>
        <View style={styles.intro}>
          <Text style={styles.subtitleFrom}>from</Text>
          <Text style={styles.subtitleFb}>FACEBOOK</Text>
        </View>
      </View>
    );
  }
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(constant.NAME);
      if (value !== null) {
        this.setState({name: value});
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };
}

//export default SplashScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    flex: 0.9,
    justifyContent: 'center',
  },
  logo: {
    height: 70,
    width: 70,
  },
  subtitleFrom: {
    color: '#C1C1C1',
    textAlign: 'center',
  },
  subtitleFb: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
  },
  intro: {
    flex: 0.1,
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
