/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {Text, View, SafeAreaView, ScrollView} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import DetailsMenu from './DetailsMenu';

export default class RecipeDetail extends Component {
  componentDidMount() {
    this.setState({recipeDetail: this.props.navigation.state.params.details});
    this.setState({isLoading: true});
    const time = this.props.navigation.state.params.details.preparationTime.split(
      ' ',
    );
    this.setState({preparationTime: time[0]});
    this.setState({preparationValue: time[1]});
  }
  constructor() {
    super();
    this.state = {
      recipeDetail: [],
      preparationTime: '',
      preparationValue: '',
    };
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <ScrollView>
          <View style={{backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', top: 8}}>
              <Text> {this.state.recipeDetail.recipeName}</Text>
              <View style={{flex: 0.97, alignItems: 'flex-end'}}>
                <FontAwesome name="bookmark-o" size={25} />
              </View>
            </View>
            <Text style={{top: 8}}> By chef vikas khanna </Text>
            <View style={{top: 20, backgroundColor: 'pink', height: 50}} />
            <View style={{height: 10, backgroundColor: 'white'}} />
            <DetailsMenu details={this.props.navigation.state.params.details} />
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            paddingBottom: 20,
            borderTopColor: '#b2b2b2',
            backgroundColor: '#e5e5e5',
          }}>
          <View style={{left: 25, top: 8}}>
            <Text style={{}}> {this.state.recipeDetail.complexity} </Text>
            <Text style={{alignSelf: 'center'}}> Level </Text>
          </View>
          <View style={{left: 40, top: 8}}>
            <Text style={{alignSelf: 'center'}}>
              {' '}
              {this.state.preparationTime}{' '}
            </Text>
            <Text> {this.state.preparationValue} </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
