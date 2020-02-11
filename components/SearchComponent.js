/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, SafeAreaView, TextInput, StyleSheet} from 'react-native';

export default class SearchComponent extends Component {
  componentDidMount() {
    // this.setState({isLoading: true});
    console.log('called Search comopent');
    console.log('===========================');
    // this.getListfromApi();
  }
  render() {
    return (
      <SafeAreaView>
        <View style={{justifyContent: 'center'}}>
          <TextInput
            placeholder="   Search any recipe here"
            style={styles.searchBtn}
          />
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  searchBtn: {
    top: 16,
    borderColor: 'pink',
    borderWidth: 2,
    width: '94%',
    height: 40,
    alignSelf: 'center',
    borderRadius: 20,
  },
});
