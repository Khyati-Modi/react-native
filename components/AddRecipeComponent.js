import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Permission from 'react-native-permissions';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';


export default class AddRecipeComponent extends Component {
  constructor() {
    super()
}

onSuccess = (position) => {
    console.log(position);
}

onError = (error) => {

}

render() {
    return <View style={{ flex: 1 }}>
        <MapView
            initialRegion={{
                latitude: 23.025836,
                longitude: 72.503349,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            }}
            style={{ flex: 1 }}
            showsUserLocation={true}
            onRegionChange={this.onMapRegionChange}
            onMarkerPress={this.onMapMarkerPressed}
        >
            <Polyline
              strokeWidth={5}
              strokeColor='blue'
              coordinates={[
                  {
                    latitude: 23.025734,
                    longitude: 72.503349
                  },
                  {
                    latitude: 23.025802,
                    longitude: 72.502587
                  },
                  {
                    latitude: 23.027712,
                    longitude: 72.502839
                  },
                  {
                    latitude: 23.027387,
                    longitude: 72.507136
                  }
                ]}>
            </Polyline>
            <Marker
                coordinate={{
                    latitude: 23.025836,
                    longitude: 72.503349,
                }}
                title='Solution Analysts'
                description='ઉકેલ વિશ્લેષકો'
                identifier='1'
            >
            </Marker>
        </MapView>
    </View>
  }

  onMapRegionChange = (region) => {
      // console.log(region);
  }

  onMapMarkerPressed = (marker) => {
      console.log(marker);
  }
}