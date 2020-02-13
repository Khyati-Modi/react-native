import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

export default class InstructionsView extends Component {
  componentDidMount() {
    // this.setState({isLoading: true});
    console.log('called InstructionsView comopent');
    console.log('===========================');

    // this.getListfromApi();
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Your InstructionsView are here</Text>
        </View>
      </SafeAreaView>
    );
  }
}
