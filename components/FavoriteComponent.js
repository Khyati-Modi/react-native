/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import * as constant from './Constants';
import FavoriteCell from './FavouriteCell';

export default class FavoriteComponent extends Component {
  componentDidMount() {
    this.getFavRecipes();
  }
  onRefresh = () => {
    this.setState({setRefreshing: true});
    this.getFavRecipes();
  };

  constructor() {
    super();
    this.state = {
      refreshing: false,
      setRefreshing: false,
      isLoading: false,
      cookingList: [],
    };
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={{height: 40, width: '100%'}}>
            <Text
              style={{
                padding: 15,
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              Your Favourite Recipe List
            </Text>
          </View>
          <FlatList
            style={{marginBottom: 90}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            numColumns={2}
            ItemSeparatorComponent={this.separator}
            data={this.state.cookingList}
            renderItem={({item}) => (
              <FavoriteCell
                itemList={item}
                onClick={details => this.btnFavoutiteClick(details)}
              />
            )}
            keyExtractor={itemList => itemList.recipeId}
            ListEmptyComponent={this.ListEmpty}
          />
        </View>
      </SafeAreaView>
    );
  }

  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          width: '100%',
          height: 500,
        }}>
        <Text style={{alignItems: 'center', textAlign: 'center', fontSize: 15}}>
          Oops! No Recipes added into favourite
        </Text>
      </View>
    );
  };

  separator = () => {
    return <View style={{height: 4, width: '100%'}} />;
  };

  btnFavoutiteClick(details) {
    this.setState({isLoading: true});
    fetch(constant.Remove_From_CookingList, {
      method: 'POST',
      body: JSON.stringify({
        recipeId: details.recipeId,
      }),
      // body: {
      //   recipeId: details.recipeId,
      // },
      headers: {
        'Content-Type': 'application/json',
        Authorization: constant.User_Token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          this.getFavRecipes();
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

  getFavRecipes = () => {
    this.setState({isLoading: true});
    fetch(constant.Cooking_List_API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: constant.User_Token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          this.setState({
            cookingList: responseJSON.map(function(items) {
              return {
                recipeId: items.recipeId,
                ytUrl: items.ytUrl,
                recipeName: items.name,
                image: items.photo,
                preparationTime: items.preparationTime,
                serves: items.serves,
                complexity: items.complexity,
                chefFirstName: items.firstName,
                chefLastName: items.lastName,
              };
            }),
          });
          this.setState({isLoading: false});
        });
      } else {
        console.log(response.body);
        Alert.alert('Error', 'Please try again later.', [
          {
            text: 'Ok',
          },
        ]);
        this.setState({isLoading: false});
      }
    });
  };
}
