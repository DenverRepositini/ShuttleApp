import React from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"

const baseUrl = 'http://localhost:8080'

class WorkShuttle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            trips: null
        }
      }

      componentDidMount(){
        axios.get(`${baseUrl}/shuttle/worktrips`)
        .then(res => {
            console.log(res);
            this.setState({
                trips: res.data
            })
        })
        .catch(err => {
            this.setState('Data not found')
            console.log(err);
          })
      }
    
    render(){
        return (
            <div>
            <h3 className=''>Work Trips</h3>
            <ul>
                {this.state.trips !== null ? this.state.trips.map((data) => {
                    return (
                        <li key={data.id}>
                            <p>{data.name}</p>
                            <p>{data.location}</p>
                            <p>{data.time}</p>
                        </li>
                    );   
                }):<div>Loading trips</div>}
            </ul>
            </div>
        );
    }
    
}

export default WorkShuttle;