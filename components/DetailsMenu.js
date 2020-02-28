import React, {Component} from 'react';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import IngredientsView from './IngredientsView';
import InstructionsView from './InstructionsView';
import DetailsView from './DetialsView';

export default class DetailsMenu extends Component {
  render() {
    return (
      <DetailMenuContainer
        screenProps={{
          handler: () => {},
          itemDetails: this.props,
        }}
      />
    );
  }
}
const detailScreenNavigation = createMaterialTopTabNavigator(
  {
    Details: DetailsView,
    Ingredients: IngredientsView,
    Instructions: InstructionsView,
  },
  {
    tabBarOptions: {
      activeTintColor: '#005CFF',
      inactiveTintColor: '#8E8E8E',
      indicatorStyle: {backgroundColor: '#005CFF'},
      labelStyle: 'bold',
      style: {backgroundColor: '#ffffff'},
    },
  },
);

const DetailMenuContainer = createAppContainer(detailScreenNavigation);
