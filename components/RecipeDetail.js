/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {Text, View, SafeAreaView, ScrollView, Alert} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as constant from './Constants';

import DetailsMenu from './DetailsMenu';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class RecipeDetail extends Component {
  componentDidMount() {
    this.setState({recipeDetail: this.props.navigation.state.params.details});
    this.setState({isLoading: true});
    const time = this.props.navigation.state.params.details.preparationTime.split(
      ' ',
    );
    this.setState({preparationTime: time[0]});
    this.setState({preparationValue: time[1]});
    this.props.navigation.addListener("didFocus", () => {
      this.setState({inCookingList: this.props.navigation.state.params.details.inCookingList});
    });
  }
  constructor() {
    super();
    this.state = {
      isLoading: false,
      recipeDetail: [],
      preparationTime: '',
      preparationValue: '',
      inCookingList: 0,
    };
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <ScrollView>
          <View style={{backgroundColor: 'white'}}>
            <View style={{flexDirection: 'row', top: 8}}>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}> {this.state.recipeDetail.recipeName}</Text>
              <View style={{flex: 0.97, alignItems: 'flex-end'}}>
              <TouchableOpacity onPress={ recipeId => this.AddOrRemoveFromFavoutites(this.state.recipeDetail.recipeId) }> 
              { this.state.recipeDetail.inCookingList === 1 ? <AntDesign name="heart" size={25} color='red'/>  :  <AntDesign name="hearto" size={25} />}
              </TouchableOpacity>
                {/* <FontAwesome name="bookmark-o" size={25} /> */}
              </View>
            </View>
            <Text style={{fontSize: 18, top: 10}}> By chef {this.state.recipeDetail.chefFirstName} {this.state.recipeDetail.chefLastName} </Text>
            <View style={{top: 20, height: 10}} />
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

AddOrRemoveFromFavoutites(recipeId) {
  this.setState({isLoading: true})
  this.state.inCookingList == 1 ? this.removeFromFavourite(this.state.recipeDetail.recipeId)  : this.AddToFavourite(this.state.recipeDetail.recipeId)
}
  removeFromFavourite(recipeId) {
      fetch(constant.Remove_From_CookingList, {
        method: 'POST',
        body: JSON.stringify({
          recipeId: recipeId,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: constant.User_Token,
        },
      }).then(response => {
        if (response.status === 200) {
          return response.json().then(responseJSON => {
            console.log(responseJSON);
            {this.state.inCookingList == 0 ? this.setState({inCookingList: 1}) : this.setState({inCookingList: 0})}
            this.props.navigation.state.params.details.inCookingList = 0
            Alert.alert('Success', 'Remove from cooking list', [
              {
                text: 'Ok',
              },
            ]);
            this.setState({isLoading: false});
          });
        } else {
          console.log(response.body);
          Alert.alert('Removed', 'Please try again later.', [
            {
              text: 'Ok',
            },
          ]);
          this.setState({isLoading: false});
        }
      });
    }

  AddToFavourite(recipeId) {
    fetch(constant.Add_To_CookingList, {
      method: 'POST',
      body: JSON.stringify({
        recipeId: recipeId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: constant.User_Token,
      }
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          console.log(responseJSON);
          {this.state.inCookingList == 0 ? this.setState({inCookingList: 1}) : this.setState({inCookingList: 0})}
          this.props.navigation.state.params.details.inCookingList = 1
          this.setState({isLoading: false});
        });
      } else {
        console.log(response.body);
        Alert.alert('Removed', 'Please try again later.', [
          {
            text: 'Ok',
          },
        ]);
        this.setState({isLoading: false});
      }
    });
  }
}
