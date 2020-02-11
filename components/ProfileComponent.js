/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class ProfileComponent extends Component {
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

        <View style={{width: '100%', height: '50%'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.profileImage}>
              <Image
                resizeMode={'contain'}
                source={{
                  uri:
                    'data:image/png;base64,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',
                }}
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
            <Text style={{top: 4}}> Khyati Modi</Text>
            <Text style={{top: 8}}> User's Profile Info </Text>
          </View>
        </View>

        <View style={styles.EditView}>
          <Text style={{alignSelf: 'center'}}> Edit Profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  onSideMenu = () => {
    // <createDrawerNavigator>
    //   navigation.openDrawer();
    //   <View>
    //     <Text> Your drawer is here</Text>
    //   </View>
    // </createDrawerNavigator>;
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
  },
});
