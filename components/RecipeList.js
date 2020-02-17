/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {SafeAreaView, FlatList, View, Text, StyleSheet} from 'react-native';
import RecipeCell from './RecipeCell';
import Feather from 'react-native-vector-icons/Feather';
import * as constant from './Constants';

export default class RecipeList extends Component {
  state = {itemList: []};

  constructor() {
    super();
    this.fetchRecipeList();
  }
  render() {
    return (
      <SafeAreaView>
        <View style={styles.titleView}>
          <Feather name="camera" size={30} />
          <Text style={styles.appNameStyle}> Instagram </Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <Feather name="send" size={25} />
          </View>
        </View>
        <FlatList
          style={styles.flatlistStyle}
          data={this.state.itemList}
          renderItem={({item}) => (
            <RecipeCell
              itemList={item}
              onClick={details => this.onPostClick(details)}
            />
          )}
          keyExtractor={itemList => itemList.recipeId}
        />
        <View style={{height: 50, backgroundColor: 'black'}} />
      </SafeAreaView>
    );
  }
  fetchRecipeList = () => {
    fetch(constant.All_Recipe_List, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': constant.User_Token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          this.setState({
            itemList: responseJSON.map(function(items) {
              return {
                recipeId: items.recipeId,
                ytUrl: items.ytUrl,
                recipeName: items.name,
                image: items.photo,
                preparationTime: items.preparationTime,
                serves: items.serves,
                complexity: items.complexity,
                shefFirstName: items.firstName,
                shefLastName: items.lastName,
              };
            }),
          });
        });
      } else {
        console.log(response.body);
      }
    });
  };

  onPostClick(details) {
    this.props.navigation.navigate('Details', {details: details});
  }
}

const styles = StyleSheet.create({
  titleView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 4,
    height: 50,
  },
  profileImage: {
    height: 25,
    width: 25,
    flexWrap: 'wrap',
  },
  appNameStyle: {
    // fontFamily: 'LilyoftheValley',
    fontSize: 24,
  },
  flatlistStyle: {
    top: 2,
  },
});
