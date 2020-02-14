/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Dimensions,
  Alert,
  TouchableWithoutFeedback,
  FlatList,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';
import * as constant from './Constants';
import LoadingIndicator from './LoadingIndicator';

export default class ProfileComponent extends Component {
  onRefresh = () => {
    this.setState({setRefreshing: true});
    this.getListfromApi();
  };

  componentDidMount() {
    this.setState({isLoading: true});
    this.getListfromApi();
  }

  constructor() {
    super();
    this.state = {
      UserName: '',
      checked: false,
      isLoading: false,
      recipesList: [],
      refreshing: false,
      setRefreshing: false,
      placeHolderImage:
        'https://www.mageworx.com/blog/wp-content/uploads/2012/06/Page-Not-Found-13.jpg',
      profilePicture:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1KKk22o-PiYCzh7Mc7G8KvPbiSFypE06mkSKWnRqP9lmjp1Yy',
    };
  }
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(constant.UserName);
      if (value !== null) {
        console.log(value);
        this.setState({UserName: value});
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <SafeAreaView>
        <View style={styles.titleView}>
          <Text> Khyati Modi </Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <AntDesign name="menu-fold" size={25} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{width: '100%', height: '22%'}}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                style={styles.profileImage}
                source={{uri: this.state.profilePicture}}
              />
            </View>

            <View style={[styles.FollowInfoView, {left: 40}]}>
              <Text style={{alignSelf: 'center'}}> 10 </Text>
              <Text style={{alignSelf: 'center'}}> Posts </Text>
            </View>
            <View style={[styles.FollowInfoView, {left: 50}]}>
              <Text style={{alignSelf: 'center'}}> 10 </Text>
              <Text style={{alignSelf: 'center'}}> Followers </Text>
            </View>
            <View style={[styles.FollowInfoView, {left: 60}]}>
              <Text style={{alignSelf: 'center'}}> 10 </Text>
              <Text style={{alignSelf: 'center'}}> Following </Text>
            </View>
          </View>

          <View style={{top: 20, left: 10}}>
            <Text style={{top: 4}}> {this.state.UserName} </Text>
            <Text style={{top: 8}}> User's Profile Info </Text>
          </View>
        </View>

        <View style={styles.EditView}>
          <Text style={{alignSelf: 'center'}}> Edit Profile</Text>
        </View>
        <LoadingIndicator isLoading={this.state.isLoading} />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          numColumns={3}
          data={this.state.recipesList}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  margin: 1,
                  backgroundColor: 'cyan',
                  height: 100,
                  width: (Dimensions.get('window').width - 6) / 3,
                }}>
                <View style={styles.postContainer}>
                  <TouchableWithoutFeedback
                    onPress={() => this.onPostClick(item)}>
                    <Image
                      resizeMode={'stretch'}
                      // style={styles.recipeImage}
                      source={
                        item.photo
                          ? {uri: item.photo}
                          : require('../images/placeholder.jpeg')
                      }
                      style={styles.image}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            );
          }}
          keyExtractor={item => item.recipeId}
          extraData={this.state}
        />
      </SafeAreaView>
    );
  }

  getListfromApi = () => {
    fetch(constant.All_Recipe_List, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': constant.User_Token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          this.setState({recipesList: responseJSON});
          console.log('Your response fetch by api.');
          //DATA = responseJSON
          this.setState({isLoading: false});
        });
      } else {
        console.log(response.body);
        Alert.alert('Error', 'Please try again later.', [
          {
            text: 'Ok',
          },
        ]);
        this.setState({isLoading: false});
      }
    });
  };

  onPostClick = item => {
    console.log(item);
  };
}
const styles = StyleSheet.create({
  titleView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 4,
    height: 50,
  },
  profileImage: {
    top: 15,
    left: 15,
    alignItems: 'flex-start',
    backgroundColor: 'red',
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  FollowInfoView: {
    width: 70,
    height: '100%',
    justifyContent: 'center',
  },
  EditView: {
    width: '96%',
    height: 30,
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: 'center',
    bottom: 10,
  },
  postContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
