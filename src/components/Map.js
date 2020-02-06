import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

const styles = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{color: '#263c3f'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#6b9a76'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#38414e'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{color: '#212a37'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{color: '#9ca5b3'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#746855'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#1f2835'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{color: '#f3d19c'}]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{color: '#2f3948'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{color: '#d59563'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{color: '#17263c'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#515c6d'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#17263c'}]
  }
]

export class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      pos: null,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    }
    this.updateLocation = this.updateLocation.bind(this)
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.updateLocation)
  }

  updateLocation = (position) => {
    // alert(`${position.coords.latitude}, ${position.coords.longitude}`)
    this.setState({
      pos: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    })
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onWindowClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const {pos} = this.state
    return (
      <div className="map-container" style={{height: window.innerHeight - 48}}>
        {
          pos ? (
            <React.Fragment>
              <div>loading...</div>
              <Map
                google={this.props.google}
                zoom={15}
                style={mapStyles}
                styles={styles}
                initialCenter={{
                  lat: pos.lat,
                  lng: pos.lng
                }}
                // initialCenter={{
                //   lat: 40.854885,
                //   lng: -88.081807
                // }}
              >
                <Marker
                  name={'Your Position'}
                  position={{lat: pos.lat, lng: pos.lng}}
                  icon={{
                    url: "img/mask24.png"
                  }}
                  onClick={this.onMarkerClick}
                />
                <InfoWindow
                  marker={this.state.activeMarker}
                  visible={this.state.showingInfoWindow}
                  onClose={this.onWindowClose}
                >
                  <div className="map-info">
                    <h4>{this.state.selectedPlace.name}</h4>
                  </div>
                </InfoWindow>
                {/* <Marker
                  title={'The marker`s title will appear as a tooltip.'}
                  name={'SOMA'}
                  position={{lat: 37.778519, lng: -122.405640}} />
                <Marker
                  name={'Dolores park'}
                  position={{lat: 37.759703, lng: -122.428093}} /> */}
                {/* <Marker
                  name={'Your position'}
                  position={{lat: 37.762391, lng: -122.439192}}
                  icon={{
                    url: "/path/to/custom_icon.png",
                    anchor: new google.maps.Point(32,32),
                    scaledSize: new google.maps.Size(64,64)
                  }}
                /> */}
              </Map>
            </React.Fragment>
          ) :
          <div>
            Please provide your location. <br/><br/> 請提供你的位置資訊
          </div>
        }
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAYkE7-6e5DVFlhVh_E58NkByrp8S3VGxw',
  language: 'zh-tw',
})(MapContainer);
