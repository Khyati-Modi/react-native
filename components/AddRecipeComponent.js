/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as constant from './Constants';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {setToken} from './Actions/userTokenAction';

class AddRecipeComponent extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      recipeName: '',
      serves: '',
      complexity: '',
      imageURL: '',
      preparationTime: '',
      isLoading: false,
      recipeId: '',
      photo: '',
    };
  }
  componentDidMount(){
    this.setState({ token: this.props.token})
  }
  render() {
    return (
      <ScrollView>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{top: 10, flex: 0.3, width: '100%'}}>
          <Text style={{padding: 10}}> Add image of your Recipe</Text>
          <View style={{justifyContent: 'center'}}>
            <Image
              style={{
                height: 200,
                width: '90%',
                top: 8,
                alignSelf: 'center',
                borderRadius: 20,
                borderColor: '#0080ff',
                borderWidth: 2,
              }}
              source={{uri: this.state.photo}}
            />
            <TouchableOpacity
              style={{position: 'absolute', alignSelf: 'center', opacity: 1.0}}
              onPress={this.chooseImage}>
              <Ionicons
                name="md-add-circle-outline"
                size={30}
                color="#0080ff"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 0.7,
            top: 10,
          }}>
          <View style={styles.borderViewStyle}>
            <TextInput
              placeholder="Recipe Name"
              placeholderTextColor="grey"
              style={styles.InputValue}
              value={this.state.recipeName}
              onChangeText={recipeName => this.setState({recipeName})}
            />
          </View>
          <View style={styles.seperatorView} />
          <View style={styles.borderViewStyle}>
            <TextInput
              placeholder="Preparation time"
              placeholderTextColor="grey"
              style={styles.InputValue}
              value={this.state.preparationTime}
              onChangeText={preparationTime => this.setState({preparationTime})}
            />
          </View>
          <View style={styles.seperatorView} />
          <View style={styles.borderViewStyle}>
            <TextInput
              placeholder="Number of people to serve"
              placeholderTextColor="grey"
              style={styles.InputValue}
              value={this.state.serves}
              onChangeText={serves => this.setState({serves})}
            />
          </View>
          <View style={styles.seperatorView} />
          <View style={styles.borderViewStyle}>
            <TextInput
              placeholder="Complexity Level"
              placeholderTextColor="grey"
              style={styles.InputValue}
              value={this.state.complexity}
              onChangeText={complexity => this.setState({complexity})}
            />
          </View>
          <View
            style={{top: 30, width: '40%', height: 45, alignSelf: 'center'}}>
              <TouchableOpacity style={{ backgroundColor: '#0080ff', width: '100%', height: '100%', justifyContent: 'center', borderRadius: 30}} onPress={this.addRecipe}> 
              <Text style={{alignSelf: 'center', color: 'white'}}> Add Recipe </Text>
              </TouchableOpacity>
            {/* <Button title="Add Recipe" onPress={this.addRecipe} /> */}
          </View>
        </View>
      </View>
      </ScrollView>
    );
  }
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(constant.User_Token);
      if (value !== null) {
        this.setState({User_Token: value});
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({isLoading: false});
  };
  addRecipe = () => {
    this.setState({isLoading: true});
    console.log(this.props.token);
    
    fetch(constant.Add_New_Recipe, {
      method: 'POST',
      body: JSON.stringify({
        name: this.state.recipeName,
        preparationTime: this.state.preparationTime,
        serves: this.state.serves,
        complexity: this.state.complexity,
      }),
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': this.props.token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          console.log(responseJSON);
          this.setState({
            isLoading: false,
            recipeName: '',
            preparationTime: '',
            serves: '',
            complexity: '',
            recipeId: responseJSON.id,
          });
          this.uploadImage();
        });
      } else {
        console.log(response.body);
        Alert.alert('Error', 'Something Went wrong', [
          {
            text: 'Ok',
          },
        ]);
      }
    });
  };


  uploadImage = () => {
    this.setState({isLoading: true});
    var photo = {
      uri: this.state.photo,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };
    var formData = new FormData();
    formData.append('photo', photo);
    formData.append('recipeId',this.state.recipeId)

    fetch(constant.Add_Recipe_Image, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': this.props.token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          console.log(responseJSON);
          Alert.alert('Success', 'Recipe Added Successfully', [
            {
              text: 'Ok',
            },
          ]);
          this.setState({
            isLoading: false,
            photo: '',
          });
        });
      } else {
        console.log(response.body);
        Alert.alert('Error', 'Something Went wrong', [
          {
            text: 'Ok',
          },
        ]);
      }
    });
  };
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
        console.log(response.uri)
        this.setState({
          photo: response.uri,
        });
      }
    });
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
  return {token: state.userTokenReducer.token}
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddRecipeComponent);

const styles = StyleSheet.create({
  borderViewStyle: {
    width: '90%',
    alignSelf: 'center',
    height: 56,
    borderColor: '#0080ff',
    borderWidth: 2,
    borderRadius: 25,
    justifyContent: 'center',
    top: 20,
  },
  InputValue: {
    alignSelf: 'center',
    height: 50,
    width: '94%',
    borderColor: 'black',
    borderRadius: 25,
  },
  seperatorView: {
    width: '100%',
    height: 8,
  },
});
