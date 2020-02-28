/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  Alert,
} from 'react-native';
import RecipeCell from './RecipeCell';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import * as constant from './Constants';
import {connect} from 'react-redux';
import {setRecipeList} from './Actions/dataAction';
import {TouchableOpacity} from 'react-native-gesture-handler';

class RecipeList extends Component {
  constructor() {
    super();
    this.state = {
      itemList: [],
      refreshing: false,
      setRefreshing: false,
    };
  }

  componentDidMount() {
    this.fetchRecipeList();
  }

  onRefresh = () => {
    this.setState({setRefreshing: true});
    this.fetchRecipeList();
  };

  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <View style={styles.titleView}>
          <Feather name="camera" size={30} />
          <Text style={styles.appNameStyle}> Instagram </Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={this.goToAddRecipe}>
              <Entypo name="add-to-list" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
          style={styles.flatlistStyle}
          data={this.state.itemList}
          renderItem={({item}) => (
            <RecipeCell
              itemList={item}
              onClick={details => this.onPostClick(details)}
              onFavouriteClick={details => this.AddOrRemoveFromFavoutites(details)}
              onDeleteClick = {details => this.deleteRecipe(details)}
            />
          )}
          keyExtractor={itemList => itemList.recipeId}
        />
        <View style={{height: 50}} />
      </SafeAreaView>
    );
  }
  goToAddRecipe = () => {
    this.props.navigation.navigate('AddRecipe');
  };
  fetchRecipeList = () => {
    console.log(this.props.token);
    fetch(constant.All_Recipe_List, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': this.props.token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          this.props.setRecipeList(responseJSON);
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
                chefFirstName: items.firstName,
                chefLastName: items.lastName,
                inCookingList: items.inCookingList,
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

  deleteRecipe(details) {
    Alert.alert('', 'Are you sure you want to delete this recipe?', [
      {
        text: 'Yes',
        onPress: () => {          
          let api = 'http://35.160.197.175:3006/api/v1/recipe/'+ details.recipeId
          fetch(api, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization' : this.props.token,
            },
          }).then(response => {
            if (response.status === 200) {
              return response.json().then(responseJSON => {
                console.log(responseJSON);
                this.fetchRecipeList();
                Alert.alert('Deleted', 'Recipe deleted successfully!', [
                  {
                    text: 'Ok',
                  },
                ]);
                // this.setState({isLoading: false});
              });
            } else {
              console.log(response.body);
              Alert.alert('Error', 'Please try again later.', [
                {
                  text: 'Ok',
                },
              ]);
              // this.setState({isLoading: false});
            }
          });
        },
      },
      {
        text: 'No',
        onPress: () => {
          return null;
        },
      },
    ]);
  }

  AddOrRemoveFromFavoutites(details) {
    this.setState({isLoading: true});
    details.inCookingList === 1
      ? this.removeFromFavourite(details)
      : this.AddToFavourite(details);
  }

  removeFromFavourite(details) {
    details.inCookingList = 0
    fetch(constant.Remove_From_CookingList, {
      method: 'POST',
      body: JSON.stringify({
        recipeId: details.recipeId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          console.log(responseJSON);
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

  AddToFavourite(details) {
    details.inCookingList = 1
    fetch(constant.Add_To_CookingList, {
      method: 'POST',
      body: JSON.stringify({
        recipeId: details.recipeId,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.props.token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          console.log(responseJSON);
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
  }
}
const mapDispatchToProps = dispatch => {
  return {
    setRecipeList: list => {
      dispatch(setRecipeList(list));
    },
  };
};
const mapStateToProps = state => {
  return {
    token: state.userTokenReducer.token,
    recipeFeed: state.dataReducer.recipeFeed,
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeList);

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
