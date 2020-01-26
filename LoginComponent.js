import React, { Component } from 'react'
import { View, Text, ImageBackground, Image ,StyleSheet, TextInput, Button, TouchableOpacity, Alert } from 'react-native'
import {  Colors} from 'react-native/Libraries/NewAppScreen';

export default class LoginComponent extends Component {
    constructor() {
        super()
//        this.state = { email: 'jm1@example.com', password: 'jay@123' }
        this.state = { email: '', password: '' }
    }

     render() {
            return <View style={styles.container}>
                        <ImageBackground source={ {uri: 'https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm28-gradient-poy-348_2.jpg?auto=format&bg=transparent&con=3&cs=srgb&dpr=1&fm=jpg&ixlib=php-3.1.0&mark=rawpixel-watermark.png&markalpha=90&markpad=13&markscale=10&markx=25&q=75&usm=15&vib=3&w=1400&s=1542957193f65cb42e8d1491ac952dbe'}}  style={styles.backgroundImage}>

                        <View style={styles.topView}>
                            <Text style={styles.loginTitle}> Login </Text>
                        </View>

                    <View style={styles.middleView}>
                        <TextInput
                            keyboardType='email-address'
                            placeholder='Email'
                            style={[styles.commonInput, styles.emailInput]}
                            value={this.state.email}
                            onChangeText={(email) => this.setState({ email })}
                        ></TextInput>
                        <TextInput
                            placeholder='Password'
                            style={styles.commonInput}
                            secureTextEntry={true}
                            value={this.state.password}
                            onChangeText={(password) => this.setState({ password })}
                        ></TextInput>

                        <TouchableOpacity style={styles.loginButtonContainer} onPress={this.onLogin}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomView}>

                    </View>
                </ImageBackground>
            </View>
        }

        onLogin = () => {
            // console.log('====================================');
            // console.log(this.state.email);
            // console.log(this.state.password);
            // console.log('====================================');

            //Note:- Provide valid URL
            fetch('http://api/v1/user/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'email': this.state.email,
                        'password': this.state.password
                    })
                }).then((response) => {
                    if (response.status == 200) {
                        return response.json()
                    } else {

                    }
                }).then((responseJSON) => {
                    console.log(responseJSON);
                    Alert.alert('Success', 'Logged in', [
                        {
                            text: 'Yes',
                            style: 'cancel'
                        },
                        {
                            text: 'Yes',
                            style: 'destructive'
                        },
                    ])
                })
        }
    }

    const styles = StyleSheet.create({
        loginButtonContainer: {
            top:20,
            backgroundColor: '#FF33A8',
            width: '80%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
        },
        loginButtonText: {
            fontSize: 17,
            color: 'white',
            fontWeight: 'bold'
        },
        commonInput: {
            width: '80%',
            // backgroundColor: 'red',
            borderWidth: 1,
            height: 50,
            borderRadius: 10,
            padding: 10,
        },
        emailInput: {
            bottom: 10
        },
        passwordInput: {

        },
        loginTitle: {
            fontSize: 30,
            fontWeight: '500',
            color : '#FF33A8',
        },
        container: {
            flex: 1
        },
        topView: {
            flex: 0.3,
            // backgroundColor: 'cyan',
            alignItems: 'center',
            justifyContent: 'center',
        },
        middleView: {
            flex: 0.4,
            // backgroundColor: 'pink',
            justifyContent: 'center',
            alignItems: 'center'
        },
        bottomView: {
            flex: 0.3,
            // backgroundColor: 'yellow'
        },
         backgroundImage:{
            flex: 1,
            resizeMode: 'cover',
           },
    })