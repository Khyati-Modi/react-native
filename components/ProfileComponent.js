/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setRecipeList} from './Actions/dataAction';
import {setProfileImage} from './Actions/profileImageAction';

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

class ProfileComponent extends Component {
  onRefresh = () => {
    this.setState({setRefreshing: true});
    this.getListfromApi();
  };

  componentDidMount() {
    this.props.navigation.addListener("didFocus", () => {
      this.setState({profilePicture: this.props.profilePicture});
    });
    
    this.setState({isLoading: true, profilePicture: this.props.profilePicture});
    this.retrieveData();
  }

  constructor() {
    super();
    this.state = {
      UserName: null,
      checked: false,
      isLoading: false,
      refreshing: false,
      setRefreshing: false,
      placeHolderImage:
        'https://www.mageworx.com/blog/wp-content/uploads/2012/06/Page-Not-Found-13.jpg',
      profilePicture: 'https://www.mageworx.com/blog/wp-content/uploads/2012/06/Page-Not-Found-13.jpg',
    };
  }
  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(constant.UserName);
      if (value !== null) {
        this.setState({UserName: value});
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({isLoading: false});
  };
  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <View style={styles.titleView}>
          <Text> {this.state.UserName} </Text>
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
          <TouchableOpacity onPress={this.goToEditView}>
            <Text style={{alignSelf: 'center'}}> Edit Profile</Text>
          </TouchableOpacity>
        </View>
        <LoadingIndicator isLoading={this.state.isLoading} />
        <FlatList style={{marginBottom: 230}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          numColumns={3}
          data={this.props.recipeList}
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
                    onPress={() => this.onPostClicked(item)}>
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

  goToEditView = () => {
    this.props.navigation.navigate('Edit');
  };

  onPostClicked = item => {
    console.log(item);
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setRecipeList: list => {
      dispatch(setRecipeList(list));
    },
    setProfileImage: profileImage => {
      dispatch(setProfileImage(profileImage));
    },
  };
};

const mapStateToProps = state => {
  return {
    recipeList: state.dataReducer.recipeList,
    token: state.userTokenReducer.token,
    profilePicture: state.userProfileImageReducer.profilePhoto,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileComponent);

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
