/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as constant from './Constants';

export default class SearchComponent extends Component {
  componentDidMount() {
    // this.setState({isLoading: true});
    console.log('called Search comopent');
    console.log('===========================');
    // this.getListfromApi();
  }
  constructor() {
    super();
    this.state = {search: ''};
  }

  render() {
    return (
      <SafeAreaView>
        <View style={styles.SearchView}>
          <TextInput
            style={{width: '90%', padding: 10}}
            placeholder="   Search any recipe here "
            onChangeText={search => this.setState({search})}
          />
          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => this.onSearchClick()}>
            <AntDesign
              style={{alignItems: 'flex-end'}}
              name="search1"
              color="#005CFF"
              size={20}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  onSearchClick = () => {
    fetch(constant.Search_Recipe_API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': constant.User_Token,
      },
      Params: JSON.stringify({
        q: this.state.search,
      }),
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          console.log('ssucessss!');
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
}
const styles = StyleSheet.create({
  SearchView: {
    borderColor: '#005CFF',
    borderWidth: 2,
    top: 16,
    height: 40,
    flexDirection: 'row',
    borderRadius: 20,
    width: '94%',
    alignSelf: 'center',
  },
});
