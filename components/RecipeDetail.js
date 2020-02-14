/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {Text, View, SafeAreaView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DetailsMenu from './DetailsMenu';

export default class RecipeDetail extends Component {
  componentDidMount() {
    console.log('Called Recipe Details');
    this.setState({isLoading: true});
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text> {this.props.name}</Text>
            <Text> Recipe Anme </Text>
            <View style={{flex: 0.97, alignItems: 'flex-end'}}>
              <FontAwesome name="bookmark-o" size={25} />
            </View>
          </View>
          <Text> By chef vikas khanna </Text>
          <View style={{top: 10, backgroundColor: 'cyan', height: 50}} />
          <DetailsMenu />
          <View style={{top: 10, backgroundColor: 'cyan', height: 50}} />
        </View>
      </SafeAreaView>
    );
  }
}
