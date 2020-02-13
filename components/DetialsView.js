import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';

export default class DetailsView extends Component {
  componentDidMount() {
    // this.setState({isLoading: true});
    console.log('called DetailsView comopent');
    console.log('===========================');

    // this.getListfromApi();
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Your DetailsView are here</Text>
        </View>
      </SafeAreaView>
    );
  }
}
