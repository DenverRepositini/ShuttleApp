import React from 'react'
import axios from 'axios';

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
        setInterval(() => {
          getLocation();
        }, 1000);
       
      }
 render(){
    return(
        <>
        <div>
            {JSON.stringify(this.state)}
        </div>
       
        </>
    )
 }
}

export default Driver;