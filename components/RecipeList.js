import React, {Component} from 'react';
import {SafeAreaView, FlatList} from 'react-native';

export default class RecipeList extends Component {
  state = {itemList: []};

  constructor() {
    super();
    this.fetchRecipeList();
  }
  render() {
    return (
      <SafeAreaView>
        <FlatList
          itemList={this.state.itemList}
          renderItem={({itemList}) => <itemList title={itemList.title} />}
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
          console.log(this.itemList);
        });
      } else {
        console.log(response.body);
      }
    });
  };
}
