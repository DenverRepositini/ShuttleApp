import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import GoogleMapReact from 'google-map-react';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import './shuttleLocation.scss'

const mapsKey = process.env.REACT_APP_MAPSKEY
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
          <div className='ping'>
          <button className='ping__button' onClick={this.pingShuttle}>
            <div className='ping__call'>
              <LocationOnIcon/>
              PING SHUTTLE
            </div>
           </button>
          <div>Last seen: {this.state.currentLocation.lastSeen}</div>
          <div className='ping__map' style={{ height: '60vh', width: '80%' }}>  
            <GoogleMapReact
              bootstrapURLKeys={{ key: mapsKey }}
              defaultCenter={this.state.currentLocation.location}
              defaultZoom= {15}
            >
              <Coordinates         
                lat={this.state.currentLocation.location.lat}
                lng={this.state.currentLocation.location.lng}
                
              />
            </GoogleMapReact>
          </div>
          <a className='ping__phone' href="tel:+15555551212">
            <div className='ping__call' >
              <PhoneIcon>
              </PhoneIcon>
                CALL SHUTTLE
            </div>
           </a>
          </div>
        )
      } else {
        return (
          <>
          {/* Default map if shuttle location not found */}
            <div className='status' > Shuttle location not found</div>
            <div className='ping' >
            <button className='ping__button' onClick={this.pingShuttle}>
            <div className='ping__call'>
              <LocationOnIcon/>
              PING SHUTTLE
            </div>
            </button>
            <div className='ping__map' style={{ height: '60vh', width: '80%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: mapsKey }}
              defaultCenter={defaultProps.center}
              defaultZoom= {15}
            >

            </GoogleMapReact>
          </div>
          <a className='ping__phone' href="tel:+15555551212">
            <div className='ping__call'>
              <PhoneIcon>
              </PhoneIcon>
               CALL SHUTTLE
            </div>
           </a>
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