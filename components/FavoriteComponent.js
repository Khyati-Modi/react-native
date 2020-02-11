import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

export default class FavoriteComponent extends Component {
  componentDidMount() {
    // this.setState({isLoading: true});
    console.log('called favorite comopent');
    console.log('===========================');

    // this.getListfromApi();
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Your Favourite Recipes are here</Text>
        </View>
      </SafeAreaView>
    );
  }
}
