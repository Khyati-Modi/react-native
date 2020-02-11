/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';

export default class AddRecipeComponent extends Component {
  componentDidMount() {
    // this.setState({isLoading: true});
    console.log('called Add REcipe comopent');
    console.log('===========================');

    // this.getListfromApi();
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Add New Recipe</Text>
        </View>
      </SafeAreaView>
    );
  }
}
