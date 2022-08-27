import React from 'react'
import axios from 'axios';
import './driver.scss';

const baseUrl = 'http://localhost:8080'

class Driver extends React.Component {
  constructor(props){
      super(props);
      this.state = {
            lat: null,
            lng: null,
            time: null
      };
  }

  componentDidMount() {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
      console.log(position)
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        time: position.timestamp
      })
      axios.post(`${baseUrl}/shuttle/driverlocation`, {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err);
      })
    });
    };
    getLocation();
    this.myInterval = 
      setInterval(() => 
      getLocation()
      , 1000);
       
   }

  componentWillUnmount(){
    clearInterval(this.myInterval);
  }

  render(){
    return(
        <>
        
        <div className='driver-location' >
            Your Location: 
            <p>LAT:   {JSON.stringify(this.state.lat)}</p>
            <p>LNG:   {JSON.stringify(this.state.lng)}</p>
            <p>TIME:   {JSON.stringify(this.state.time)}</p>
        </div>
        </>
    )
  }
}

export default Driver;