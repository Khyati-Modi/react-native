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
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import {setProfileImage} from './Actions/profileImageAction';
import Permissions from 'react-native-permissions';

class EditProfileComponent extends Component {
  constructor() {
    super()
    this.state = { image: ' ',
    editPhotoTapped: null, }
}

componentDidMount(){
  this.setState({
    image : this.props.image,
  })
}

  chooseImage = () => {
    var options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        console.log(response.uri);
        this.setState({
          image: response.uri,
          editPhotoTapped: true,
        });
      }
    });
  }

  saveProfileImage = () => {
    this.props.setProfileImage(this.state.image);
    this.setState({
      editPhotoTapped: null,
    });
    Alert.alert('','Profile Image updated successfully', [
      {
        text: 'Ok',
      },
    ]);
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <View style={{width: '100%', height: '100%'}}>
        <View style={{height: 44, width: '100%', flexDirection: 'row'}}> 
        <View style= {{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style= {{flexDirection: 'row', alignItems: 'center'}} onPress={this.backAction}> 
          <AntDesign name="left" size={20} color='#147efb' style={{padding: 4}}> </AntDesign>
          <Text style={{color: '#147efb', fontSize: 20}}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity style={{marginRight: 8,justifyContent:'center',alignItems:'center',height:'100%'}} onPress={this.saveProfileImage}>
            <Text style={{color: '#147efb', fontSize: 20, alignSelf: 'center'}}>Save</Text>
         </TouchableOpacity>
        </View>
        </View>
          <View
            style={{
              flex: 0.5,
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              style={{ width: '35%',height: '40%',alignSelf: 'center',borderRadius: 50}}>
              <Image
                style={{ width: '100%',height: '100%',borderRadius: 50}}
                source={{uri: this.state.image}}
              />
            </TouchableOpacity>
            <Button title = "Change Profile " onPress={this.chooseImage} > </Button>
          </View>
          <View style={{flex: 0.5}}>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  backAction = () => {
    { this.state.editPhotoTapped && Alert.alert(
      'Unsaved changes',
      'You have unsaved changes. Are you sure you want to cancel?',
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
            this.props.navigation.navigate('Profile');
          },
        },
      ],
      {cancelable: false},
    )
  }
  {!this.state.editPhotoTapped && this.props.navigation.navigate('Profile');} 
  }
 }
 
 const mapDispatchToProps = dispatch => {
  return {
    setProfileImage: profilePhoto => {
      dispatch(setProfileImage(profilePhoto));
    },
  };
};

const mapStateToProps = state => {
  return {
    image: state.userProfileImageReducer.profilePhoto,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfileComponent);