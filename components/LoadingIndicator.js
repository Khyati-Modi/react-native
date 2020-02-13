/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ActivityIndicator} from 'react-native';

export default function LoadingIndicator(props) {
  if (props.isLoading) {
    return (
      <View style={{width: '100%', height: '100%', zIndex: 10}}>
        <ActivityIndicator size="large" color="#1774EA" style={{flex: 1}} />
      </View>
    );
  } else {
    return <View />;
  }
}
