import React from 'react';
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';

const mapsKey = 'AIzaSyB7iTcMNo0Ju4-JOzrIAkAFz5RIbgN1eM8'
const baseUrl = 'http://localhost:8080'


const Coordinates = () => <div> <AirportShuttleIcon fontSize='large' /> </div>;
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
      if (this.state.currentLocation !== 'Location unknown') {
         return (
          // Returns Shuttle location if coordinates not null
          <div style={{ height: '80vh', width: '80%' }}>
            <button onClick={this.pingShuttle}>PING SHUTTLE</button>
            <div>Last seen:{this.state.currentLocation.lastSeen}</div>
            <GoogleMapReact
              bootstrapURLKeys={{ key: mapsKey }}
              defaultCenter={defaultProps.center}
              defaultZoom= {15}
            >
              <Coordinates         
                lat={this.state.currentLocation.location.lat}
                lng={this.state.currentLocation.location.lng}
                text='shuttle' 
              />
            </GoogleMapReact>
          </div>
        )
      } else {
        return (
          <>
          {/* Default map if shuttle location not found */}
            <div> Shuttle location not found</div>
            <button onClick={this.pingShuttle}>PING SHUTTLE</button>
            <div style={{ height: '80vh', width: '80%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: mapsKey }}
              defaultCenter={defaultProps.center}
              defaultZoom= {15}
            >
              <Coordinates         
                lat={defaultProps.center.lat}
                lng={defaultProps.center.lng}
                text="" 
              />
            </GoogleMapReact>
          </div>
          </>
          
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