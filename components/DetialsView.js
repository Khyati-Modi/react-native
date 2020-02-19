/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView, Image, Text} from 'react-native';

export default class DetailsView extends Component {
  componentDidMount() {
    const itemDetails = this.props.screenProps.itemDetails.details;
    this.setState({photo: itemDetails.image});
    this.setState({nameofRecipe: itemDetails.recipeName});
    this.setState({firstName: itemDetails.chefFirstName});
    this.setState({inCookingList: itemDetails.inCookingList});
    this.setState({lastName: itemDetails.chefLastName});
    this.setState({serves: itemDetails.serves});
    this.setState({recipeId: itemDetails.recipeId});
  }
  constructor() {
    super();
    this.state = {
      nameofRecipe: '',
      photo: '',
      firstName: '',
      inCookingList: 0,
      lastName: '',
      recipeId: '',
      serves: '',
    };
  }

  render() {
    return (
      <SafeAreaView>
        <View style={{height: 500}}>
          <View style={{height: 250}}>
            <Image
              resizeMode={'stretch'}
              style={styles.recipeImage}
              source={
                this.state.photo
                  ? {uri: this.state.photo}
                  : require('../images/placeholder.jpeg')
              }
            />
            <View>
              <Text style={{padding: 10, top: 10, bottom: 10}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing
                and typesetting industry.
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  recipeImage: {
    width: '100%',
    height: '100%',
  },
});
