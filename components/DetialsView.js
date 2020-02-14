/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, SafeAreaView, Image} from 'react-native';
import * as constant from './Constants';

export default class DetailsView extends Component {
  state = {detailsData: []};
  componentDidMount() {
    // this.getDetails();
  }

  render() {
    console.log(this.state.detailsData);
    return (
      <SafeAreaView>
        <View style={{height: 300}}>
          <Image
            resizeMode={'stretch'}
            style={styles.recipeImage}
            source={
              this.state.detailsData.photo
                ? {uri: this.state.detailsData.photo}
                : require('../images/placeholder.jpeg')
            }
          />
        </View>
      </SafeAreaView>
    );
  }
  getDetails = () => {
    let detailAPI = constant.Recipe_Detail_API + /673/ + 'details';
    console.log('-----------------------------');
    console.log(detailAPI);
    console.log('-----------------------------');
    fetch(detailAPI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': constant.User_Token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          console.log('SuccessFull!');
          // this.setState({
          //   detailsData: responseJSON.map({
          //     ytUrl: detailsData.ytUrl,
          //     recipeName: detailsData.name,
          //     image: detailsData.photo,
          //     preparationTime: detailsData.preparationTime,
          //     serves: detailsData.serves,
          //     complexity: detailsData.complexity,
          //     chefFirstName: detailsData.firstName,
          //     chefLastName: detailsData.lastName,
          //     inCookingList: detailsData.inCookingList,
          //   }),
          // });
        });
      } else {
        console.log(response.body);
      }
    });
  };
}
const styles = StyleSheet.create({
  recipeImage: {
    width: '100%',
    height: '100%',
  },
});
