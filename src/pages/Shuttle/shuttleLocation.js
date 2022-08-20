import React from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';

const mapsKey = 'AIzaSyB7iTcMNo0Ju4-JOzrIAkAFz5RIbgN1eM8'
const baseUrl = 'http://localhost:8080'


const Coordinates = ({ text }) => <div>{text}</div>;
const defaultProps = {
    center: {
      "lat" : 51.425369,
      "lng": -116.177254
    },
    zoom: 15  
  };

class ShuttleLocation extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      currentLocation: null
    };
  }

  pingShuttle = (e) => {
    e.preventDefault();
    axios.get(`${baseUrl}/shuttle/pingshuttle`)
    .then(res => {
      console.log(res);
      this.setState({
        currentLocation: res.data
      })
      window.location.reload();
    })
    .catch(err => {
      this.setState({
        currentLocation: 'Request failed'
      })
      console.log(err);
    })
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
          <div style={{ height: '80vh', width: '80%' }}>
            <button onClick={this.pingShuttle}>PING SHUTTLE</button>
            <GoogleMapReact
              bootstrapURLKeys={{ key: mapsKey }}
              defaultCenter={defaultProps.center}
              defaultZoom= {15}
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