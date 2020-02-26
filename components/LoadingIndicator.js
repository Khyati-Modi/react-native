/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export default function LoadingIndicator(props) {
  if (props.isLoading) {
    return (
      <View style={{width: 50, height: 50, zIndex: 10, justifyContent: 'center', alignContent: 'center', alignSelf: 'center'}}>
        <ActivityIndicator size="large" color="black" style={{flex:1, backfaceVisibility: false}} />
      </View>
    );
  } else {
    return <View />;
  }
}
