import React, {Component} from 'react';
import {SafeAreaView, FlatList, View,Text, StyleSheet,Image} from 'react-native';
import RecipeCell from './RecipeCell';

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
        <Image
            style={styles.profileImage}
            source={require('../images/instagram.png')
            }
          />
          <Text style={styles.appNameStyle}> Instagram </Text>
        </View>
        <FlatList style={styles.flatlistStyle}
          data={this.state.itemList}
          renderItem={({item}) => <RecipeCell itemList={item} />}
          keyExtractor={itemList => itemList.recipeId}
        />
      </SafeAreaView>
    );
  }
  fetchRecipeList = () => {
    //Note:- Provide valid URL
    fetch('http://35.160.197.175:3006/api/v1/recipe/feeds', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s',
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
}

const styles = StyleSheet.create({
  titleView:{
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    top: 10,
    bottom:4,
    height: 60,
  },
  profileImage: {
    height: 25,
    width: 25,
    flexWrap: 'wrap',
  },
  appNameStyle:{
    fontSize: 24,
  },
  flatlistStyle: {
    top: 2,
  }
})