import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import * as constant from './Constants';
import {setToken} from './Actions/userTokenAction';
import {connect} from 'react-redux';
import LoadingIndicator from './LoadingIndicator';

class LoginComponent extends Component {
  constructor() {
    super();
    this.state = {isLoading: false, email: '', password: '', bgImage: 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm28-gradient-poy-348_2.jpg?auto=format&bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1400&s=1542957193f65cb42e8d1491ac952dbe'};
  }
  componentDidMount(){
    
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
         source={{uri: this.state.bgImage}}
          style={styles.backgroundImage}>
          <View style={styles.topView}>
            <Text style={styles.loginTitle}> Login </Text>
          </View>
          <LoadingIndicator isLoading={this.state.isLoading} />
          <View style={styles.middleView}>
            <TextInput
              keyboardType="email-address"
              placeholder="Email"
              style={[styles.commonInput, styles.emailInput]}
              value={this.state.email}
              onChangeText={email => this.setState({email})}
            />
            <TextInput
              placeholder="Password"
              style={styles.commonInput}
              secureTextEntry={true}
              value={this.state.password}
              onChangeText={password => this.setState({password})}
            />

            <TouchableOpacity
              style={styles.loginButtonContainer}
              onPress={this.onLogin}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bottomView} />
        </ImageBackground>
      </View>
    );
  }

  onLogin = () => {
    this.setState({isLoading: true})
    fetch('http://35.160.197.175:3006/api/v1/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          this.props.setToken(responseJSON.token);
          this.goToHomePage;
          this.storeData(responseJSON);
          this.setState({isLoading: false})
          Alert.alert('Success', 'Successfully logged in', [
            {
              text: 'Ok',
              onPress: this.goToHomePage,
            },
          ]);
        });
      } else {
        console.log(response.body);
        Alert.alert('Error', 'Please enter valid credentials.', [
          {
            text: 'Ok',
          },
        ]);
      }
    });
  };

  storeData = async responseJSON => {
    try {
      let userId = '';
      let UserName = '';
      userId = responseJSON.email;
      UserName = responseJSON.firstName + ' ' + responseJSON.lastName;
      await AsyncStorage.setItem(constant.UserName, UserName);
      await AsyncStorage.setItem(constant.NAME, userId);
      await AsyncStorage.setItem(constant.User_Token, responseJSON.token);
    } catch (e) {
      console.log('Error to store data' + e);
    }
  };

  goToHomePage = () => {
    this.props.navigation.navigate('MainScreen');
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setToken: token => {
      dispatch(setToken(token));
    },
  };
};
const mapStateToProps = state => {
  return {token: state.token};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginComponent);

const styles = StyleSheet.create({
  loginButtonContainer: {
    top: 20,
    backgroundColor: '#FF33A8',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  loginButtonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  commonInput: {
    width: '80%',
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  emailInput: {
    bottom: 10,
  },
  passwordInput: {},
  loginTitle: {
    fontSize: 30,
    fontWeight: '500',
    color: '#FF33A8',
  },
  container: {
    flex: 1,
  },
  topView: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middleView: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomView: {
    flex: 0.3,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
});
