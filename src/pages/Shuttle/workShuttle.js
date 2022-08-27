import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import './workShuttle.scss'
import DeleteIcon from '@mui/icons-material/Delete';

const baseUrl = 'http://localhost:8080'
const worktripsUrl = '/shuttle/worktrips';


class WorkShuttle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            trips: null
        }
      }
      
      deleteUser(id) {
        axios.delete(`${baseUrl}${worktripsUrl}/${id}`)
        .then(res => {
            axios.get(`${baseUrl}${worktripsUrl}`)
            .then(res => {
            console.log(res);
            this.setState({
                trips: res.data
            })})
            .catch(err => {
            this.setState('Data not found')
            console.log(err);
          })

            console.log(res);
        })
        .catch (err => {
            console.log(err);
            window.alert('User not found')
        })}


      componentDidMount(){
        axios.get(`${baseUrl}${worktripsUrl}`)
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
            <div className='work' >
            <h3 className='work__title'>Work Trips</h3>
            <ul className='work__list' >
                {this.state.trips !== null ? this.state.trips.map((data) => {
                    return (
                        <li className='work__list-item' key={data.id}>
                            <p>{data.name}</p>
                            <p>{data.location}</p>
                            <p>{data.time}</p>
                            {/* <DeleteIcon className='work__button'/> */}
                            <DeleteIcon className='work__button' onClick={()=> this.deleteUser(data.id)} >Delete</DeleteIcon>
                        </li>
                    );   
                }):<div>Loading trips</div>}
            </ul>
            </div>
        );
    }
    
}

export default WorkShuttle;