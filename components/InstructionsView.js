import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet, FlatList, RefreshControl, Alert} from 'react-native';
import LoadingIndicator from './LoadingIndicator';
import * as constant from './Constants';
import Entypo from 'react-native-vector-icons/Entypo';


export default class InstructionsView extends Component {
  componentDidMount() {
    const itemDetails = this.props.screenProps.itemDetails.details;
    this.getInstructions(itemDetails.recipeId);
  }
  onRefresh = () => {
    this.setState({setRefreshing: true});
    const itemDetails = this.props.screenProps.itemDetails.details;
    this.getInstructions(itemDetails.recipeId);
  };
  constructor() {
    super();
    this.state = {
      isLoading: false,
      recipeId: 0,
      photo: '',
      instructionsList: [
      ],
    };
  }
  render() {
    return (
      <SafeAreaView>
        {/* <View style={styles.container}> */}
          <LoadingIndicator isLoading={this.state.isLoading} />
          <FlatList
          style= {styles.container}
            ItemSeparatorComponent={this.separator}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
            data={this.state.instructionsList.instructions}
            renderItem={({item}) => {
              return (
                <View>
                  <View style={{flexDirection: 'row', top: 16}}>
                    <Entypo name="dot-single" size={20} />
                    <Text
                      style={{ marginStart: 10,fontSize: 16}}>
                      {item.instruction}
                    </Text>
                    <Text></Text>
                  </View>
                </View>
              );
            }}
            keyExtractor={item => item.recipeId}
            extraData={this.state}
            ListEmptyComponent={this.ListEmpty}
          />
      {/* </View> */}
    </SafeAreaView>
    );
  }
  ListEmpty = () => {
    return (
      //View to show when list is empty
      <View style={{flex:1,justifyContent:'center',}}>
        <Text style={{ textAlign: 'center',fontSize:30 }}>No Instruction Found</Text>
      </View>
    );
  };

  separator = () => {
    return ( <View style={{height: 8, width: '100%'}} /> 
    )
  }

  getInstructions = recipeId => {
    fetch('http://35.160.197.175:3006/api/v1/recipe/'+recipeId+'/details', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: constant.User_Token,
      },
    }).then(response => {
      if (response.status == 200) {
        return response.json().then(responseJSON => {
          this.setState({instructionsList: responseJSON});
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

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  container: {
    height: 400,
    margin: 10,
  },
});
