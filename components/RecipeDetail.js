/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-did-mount-set-state */
import React, {Component} from 'react';
import {Text, View, SafeAreaView, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';

import IngredientsView from './IngredientsView';
import InstructionsView from './InstructionsView';
import DetialsView from './DetialsView';

// const detailScreenNavigation = createMaterialTopTabNavigator(
//   {
//     Details: {
//       screen: DetialsView,
//       navigationOptions: {
//         header: null,
//       },
//     },
//     Ingredients: {
//       screen: IngredientsView,
//       navigationOptions: ({navigation}) => ({
//         // title: `${navigation.state.params.details.name}`,
//       }),
//     },
//     Instructions: {
//       screen: InstructionsView,
//       navigationOptions: {
//         header: null,
//       },
//     },
//   },
//   {
//     mode: 'card',
//   },
// );

const detailScreenNavigation = createMaterialTopTabNavigator(
  {
    Detail: {
      screen: DetialsView,
      navigationOptions: {
        tabBarLabel: () => {
          return 'Detail';
        },
      },
    },
    Ingredients: {
      screen: IngredientsView,
      navigationOptions: {
        tabBarLabel: () => {
          return null;
        },
      },
    },
    InstructionsView: {
      screen: InstructionsView,
      navigationOptions: {
        tabBarLabel: () => {
          return null;
        },
      },
    },
    // transfer : detailsNavigator
  },
  {
    initialRouteName: 'Detail',
  },
);

export default class RecipeDetail extends Component {
  componentDidMount() {
    this.setState({isLoading: true});
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={styles.titleView}>
            <Ionicons name="ios-arrow-round-back" size={30} />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text> {this.props.name}</Text>
            <Text> Recipe Anme </Text>
            <View style={{flex: 0.97, alignItems: 'flex-end'}}>
              <FontAwesome name="bookmark-o" size={25} />
            </View>
          </View>
          <Text> By chef vikas khanna </Text>
          <View style={{top: 10, backgroundColor: 'cyan', height: 50}} />
          <DetailMenu />
        </View>
      </SafeAreaView>
    );
  }
}
const DetailMenu = createAppContainer(detailScreenNavigation);
// const DetailMenu = createMaterialTopTabNavigator(detailScreenNavigation);

const styles = StyleSheet.create({
  titleView: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 4,
    height: 50,
  },
});
