/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';

export default class LocationComponent extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  onSuccess = position => {
    console.log(position);
  };

  onError = error => {};

  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          initialRegion={{
            latitude: 23.025836,
            longitude: 72.503349,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          }}
          style={{flex: 1}}
          showsUserLocation={true}
          onRegionChange={this.onMapRegionChange}
          onMarkerPress={this.onMapMarkerPressed}>
          <Polyline
            strokeWidth={5}
            strokeColor="black"
            coordinates={[
              {
                latitude: 23.025734,
                longitude: 72.503349,
              },
              {
                latitude: 23.025802,
                longitude: 72.502587,
              },
              {
                latitude: 23.02752,
                longitude: 72.502796,
              },
              {
                latitude: 23.027792,
                longitude: 72.498357,
              },
              {
                latitude: 23.028634,
                longitude: 72.488865,
              },
              {
                latitude: 23.028634,
                longitude: 72.488865,
              },
              {
                latitude: 23.026016,
                longitude: 72.480122,
              },
              {
                latitude: 23.025648,
                longitude: 72.476796,
              },
            ]}
          />
          <Marker
            coordinate={{
              latitude: 23.025836,
              longitude: 72.503349,
            }}
            title="Solution Analysts"
            description="ઉકેલ વિશ્લેષકો"
            identifier="1"
          />
        </MapView>
      </View>
    );
  }

  onMapRegionChange = region => {
    // console.log(region);
  };

  onMapMarkerPressed = marker => {
    console.log(marker);
  };
}
