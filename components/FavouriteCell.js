/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function FavoriteCell(props) {
  return (
    <SafeAreaView style={styles.mainView}>
      <View style={styles.mainView}>
        <View style={styles.recipeImageView}>
          {/* <TouchableOpacity onPress={() => {props.onClick(props.itemList)}}> */}
          <TouchableOpacity>
            <Image
              resizeMode={'stretch'}
              style={styles.recipeImage}
              source={
                props.itemList.image
                  ? {uri: props.itemList.image}
                  : require('../images/placeholder.jpeg')
              }
            />
            <TouchableOpacity
              style={{position: 'absolute', top: 10, right: 10, opacity: 1.0}}
              onPress={() => {
                props.onClick(props.itemList);
              }}>
              <AntDesign name="heart" size={20} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={{fontSize: 15, alignSelf: 'center', height: 30}}>
            {' '}
            {props.itemList.recipeName}{' '}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    top: 18,
    height: 180,
    flex: 1,
    bottom: 20,
    marginEnd: 4,
    left: 4,
  },
  recipeImageView: {
    height: 160,
    width: '100%',
    justifyContent: 'center',
  },
  recipeImage: {
    width: '96%',
    height: '96%',
  },
});
