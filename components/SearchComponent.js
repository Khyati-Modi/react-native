/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  FlatList,
  RefreshControl,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as constant from './Constants';

export default class SearchComponent extends Component {
  componentDidMount() {
    // this.setState({search: ' '});
  }
  constructor() {
    super();
    this.state = {
      isLoading: false,
      searchResult: [],
      refreshing: false,
      setRefreshing: false,
      search: 'Idli',
    };
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={styles.SearchView}>
            <TextInput
              style={{width: '90%', padding: 10}}
              placeholder="   Search any recipe here "
              value={this.state.search}
              onChangeText={search => this.setState({search})}
            />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => this.onSearchClick()}>
              <AntDesign
                style={{alignItems: 'flex-end'}}
                name="search1"
                color="#005CFF"
                size={20}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '100%',
              height: '90%',
              marginTop: 24,
            }}>
            <FlatList
              style={{marginBottom: 4}}
              ItemSeparatorComponent={this.separator}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                />
              }
              data={this.state.searchResult}
              renderItem={({item}) => {
                return (
                  <View>
                    <View style={styles.recipeImageView}>
                      <TouchableOpacity style={{justifyContent: 'center'}}>
                        <Image
                          resizeMode={'stretch'}
                          style={styles.recipeImage}
                          source={
                            item.photo
                              ? {uri: item.photo}
                              : require('../images/placeholder.jpeg')
                          }
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          fontSize: 20,
                          height: 30,
                          padding: 4,
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                );
              }}
              keyExtractor={item => item.recipeId}
              extraData={this.state}
              ListEmptyComponent={this.ListEmpty}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{textAlign: 'center', fontSize: 20}}>
          No Recipes Found
        </Text>
      </View>
    );
  };

  separator = () => {
    return <View style={{height: 8, width: '100%'}} />;
  };

  onSearchClick = () => {
    console.log(this.state.search);
    const apiURL = constant.Search_Recipe_API + this.state.search;
    fetch(apiURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // eslint-disable-next-line prettier/prettier
        'Authorization': constant.User_Token,
      },
    }).then(response => {
      if (response.status === 200) {
        return response.json().then(responseJSON => {
          console.log('ssucessss!');
          this.setState({searchResult: responseJSON});
          this.setState({isLoading: false});
        });
      } else {
        console.log(response.body);
        Alert.alert('Error', 'Something Went wrong', [
          {
            text: 'Ok',
          },
        ]);
      }
    });
  };
}
const styles = StyleSheet.create({
  SearchView: {
    borderColor: '#005CFF',
    borderWidth: 2,
    top: 16,
    height: 40,
    flexDirection: 'row',
    borderRadius: 20,
    width: '94%',
    alignSelf: 'center',
  },
  recipeImageView: {
    height: '100%',
    width: '100%',
  },
  recipeImage: {
    width: '96%',
    height: '60%',
    alignSelf: 'center',
  },
});
