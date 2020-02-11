import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

export default class RecipeDetail extends Component {
  componentDidMount() {
    // this.setState({isLoading: true});
    console.log('called Recipe Detail comopent');
    console.log('===========================');
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Detail of your recipe</Text>
        </View>
      </SafeAreaView>
    );
  }
}
