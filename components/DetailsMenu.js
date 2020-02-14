import React, {Component} from 'react';

import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer, NavigationEvents} from 'react-navigation';

import IngredientsView from './IngredientsView';
import InstructionsView from './InstructionsView';
import DetailsView from './DetialsView';

export default class DetailsMenu extends Component {
  componentDidMount() {
    console.log('Called Details Menu');
  }
  render() {
    return <DetailMenuContainer />;
  }
}
const detailScreenNavigation = createMaterialTopTabNavigator(
  {
    RecipeDetail: DetailsView,
    Ingredients: IngredientsView,
    InstructionsView: InstructionsView,
    // Detail: {
    //   screen: DetialsView,
    //   navigationOptions: {
    //     title: 'Hey',
    //   },
    // },
    // Ingredients: {
    //   screen: IngredientsView,
    // },
    // InstructionsView: {
    //   screen: InstructionsView,
    // },
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      activeTintColor: '#000000',
      inactiveTintColor: '#8E8E8E',
      labelStyle: {},
      indicatorStyle: {backgroundColor: 'black', height: 1.5},
      style: {backgroundColor: '#ffffff'},
    },
  },
);

const DetailMenuContainer = createAppContainer(detailScreenNavigation);
