import { Wrapper, Status } from "@googlemaps/react-wrapper";
import React from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

const mapsKey = 'AIzaSyB7iTcMNo0Ju4-JOzrIAkAFz5RIbgN1eM8'
const baseUrl = 'http://localhost:8080'


const Coordinates = ({ text }) => <div>{text}</div>;
const defaultProps = {
    // center: {
    //   lat: 10.99835602,
    //   lng: 77.01502627
    // },
    zoom: 11
  };

class ShuttleLocation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentLocation: null
    };
  }
  
  componentDidMount(){
    axios.get(`${baseUrl}/shuttle/pingshuttle`)
    .then(res => {
      console.log(res);
      this.setState({
        currentLocation: res.data
      })
    })
    .catch(err => {
      this.setState({
        currentLocation: 'Request failed'
      })
      console.log(err);
    })
  }
  render(){
    if (this.state.currentLocation !== null) {
      if (this.state.currentLocation !== 'Location not found') {
         return (
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: mapsKey }}
              defaultCenter={this.state.currentLocation.location}
              defaultZoom={defaultProps.zoom}
            >
              <Coordinates
                lat={this.state.currentLocation.location.lat}
                lng={this.state.currentLocation.location.lng}
                text="Shuttle Location"
              />
            </GoogleMapReact>
          </div>
        )
      } else {
        return (
          <div> Location not found</div>
        )
      }
    } else {
      return (
        <div>
          Location loading
        </div>
      )
    }
    
  }
 
}

export default ShuttleLocation;