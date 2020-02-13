import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

export default class IngredientsView extends Component {
  componentDidMount() {
    // this.setState({isLoading: true});
    console.log('called IngredientsView comopent');
    console.log('===========================');

    // this.getListfromApi();
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Your IngredientsView are here</Text>
        </View>
      </SafeAreaView>
    );
  }
}
