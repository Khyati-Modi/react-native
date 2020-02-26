/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';

export default class AddRecipeComponent extends Component {
  constructor() {
    super();
    this.state = {
      recipeName: '',
      serves: '',
      complexity: '',
      imageURL: '',
    };
  }
  render() {
    return (
      <SafeAreaView style={{backgroundColor: 'white'}}>
        <View>
          <View style={{justifyContent: 'center', top: 10}}>
            <View style={styles.borderViewStyle}>
              <TextInput
                placeholder="Recipe Name"
                style={styles.InputValue}
                value={this.state.recipeName}
                onChangeText={recipeName => this.setState({recipeName})}
              />
            </View>
            <View style={styles.seperatorView} />
            <View style={styles.borderViewStyle}>
              <TextInput
                placeholder="Number of people"
                style={styles.InputValue}
                secureTextEntry={true}
                value={this.state.serves}
                onChangeText={serves => this.setState({serves})}
              />
            </View>
            <View style={styles.seperatorView} />
            <View style={styles.borderViewStyle}>
              <TextInput
                placeholder="Complexity Level"
                style={styles.InputValue}
                value={this.state.complexity}
                onChangeText={complexity => this.setState({complexity})}
              />
            </View>
          </View>
          <View style={{top: 10}}>
            <Image
              style={{
                height: 150,
                width: '90%',
                backgroundColor: 'cyan',
                top: 8,
                alignSelf: 'center',
              }}
            />
          </View>
          <View
            style={{top: 30, width: '40%', height: 60, alignSelf: 'center'}}>
            <Button title="Add Recipe" />
          </View>
          <View style={{top: 30}}>
            <Text> Hello! You are in Add recipe page </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  borderViewStyle: {
    width: '90%',
    alignSelf: 'center',
    height: 56,
    borderColor: 'pink',
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: 'pink',
    justifyContent: 'center',
  },
  InputValue: {
    alignSelf: 'center',
    height: 50,
    width: '94%',
    borderColor: 'black',
    borderRadius: 25,
  },
  seperatorView: {
    width: '100%',
    height: 8,
  },
});
