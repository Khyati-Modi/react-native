import React, {Component} from 'react';
import {View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Permission from 'react-native-permissions';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default class LocationComponent extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
}

onSuccess = (position) => {
    console.log(position);
}

onError = (error) => {

}

render() {
    return <View style={{ flex: 1 }}>
      {/* <View style={styles.SearchView}>
            <TextInput
              style={{width: '90%', padding: 10}}
              placeholder="Search any recipe here "
              value={this.state.search}
              onChangeText={search => this.setState({search})}
            />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => this.onSearchClick()}>
              <AntDesign
                style={{alignItems: 'flex-end'}}
                name="search1"
                color="#005CFF"
                size={20}
              />
            </TouchableOpacity>
          </View> */}
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
              strokeColor='black'
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
                    latitude: 23.027520,
                    longitude: 72.502796
                  },
                  {
                    latitude: 23.027792,
                    longitude: 72.498357
                  },
                  {
                    latitude:  23.028634,
                    longitude:  72.488865
                  },
                  {
                    latitude:  23.028634,
                    longitude:  72.488865
                  },
                  {
                    latitude:  23.026016, 
                    longitude:  72.480122
                  },
                  {
                    latitude:  23.025648, 
                    longitude:  72.476796
                  },
                  


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
const styles = StyleSheet.create({
  SearchView: {
    borderColor: '#005CFF',
    borderWidth: 2,
    top: 16,
    height: 40,
    flexDirection: 'row',
    borderRadius: 20,
    width: '94%',
    alignSelf: 'center',
  },
});