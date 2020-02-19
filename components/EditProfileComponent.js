/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Button,
} from 'react-native';
import * as constant from './Constants';
import * as Permission from 'expo-permissions'
// import * as ImagePicker from 'expo-image-picker'
// import ImagePicker from 'react-native-image-picker';


export default class EditProfileComponent extends Component {
  constructor() {
    super()
    this.state = { image: null }
    Permission.askAsync(Permission.CAMERA)
    Permission.askAsync(Permission.CAMERA_ROLL)
}
  componentDidMount() {
    console.log('in edit profile screen');
  }
  render() {
    return (
      <SafeAreaView>
        {/* <ScrollView> */}
        <View style={{width: '100%', height: '100%'}}>
          <View
            style={{
              flex: 0.5,
              // backgroundColor: 'blue',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: '35%',
                height: '40%',
                alignSelf: 'center',
                borderRadius: 50 ,
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 50 ,
                }}
                source={{uri: constant.profilePicture}}
              />
            </TouchableOpacity>
            <Button title = "Change Profile " onPress={this.changeProfile}> </Button>
          </View>
          <View style={{flex: 0.5, backgroundColor: 'cyan'}}>
            <Text> new View</Text>
            <Button title='Camera' onPress={this.onCamera}></Button>
                <Button title='Image Gallery' onPress={this.onGallery}></Button>
                {this.state.image && <Image style={{ width: 300, height: 300 }} source={{ uri: this.state.image }}></Image>}
          </View>
        </View>

        {/* </ScrollView> */}
      </SafeAreaView>
    );
  }

  changeProfile = () => {
    console.log('open camera');
    
  }

  onCamera = () => {
    ImagePicker.launchCameraAsync().then((result) => {
        this.setState({ image: result.uri })
        console.log(result);
    })
}

onGallery = () => {
    ImagePicker.launchImageLibraryAsync().then((result) => {
        this.setState({ image: result.uri })
        console.log(result);
    })
}
 }
