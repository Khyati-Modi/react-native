/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DetailsMenu from './DetailsMenu';

export default class RecipeDetail extends Component {
  componentDidMount() {
    this.setState({isLoading: true});
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={{flexDirection: 'row', top: 8}}>
              <Text> {this.props.name}</Text>
              <Text> Recipe Anme </Text>
              <View style={{flex: 0.97, alignItems: 'flex-end'}}>
                <FontAwesome name="bookmark-o" size={25} />
              </View>
            </View>
            <Text style={{top: 8}}> By chef vikas khanna </Text>
            <View style={{top: 20, backgroundColor: 'pink', height: 50}} />
            <View style={{height: 10, backgroundColor: 'white'}} />
            <DetailsMenu />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
