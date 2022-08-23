import React from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"

const baseUrl = 'http://localhost:8080';
const groceryUrl = '/shuttle/grocerytrips';

class GroceryShuttle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            trips: null
        }
      }

      deleteUser(id) {
        axios.delete(`${baseUrl}${groceryUrl}/${id}`)
        .then(res => {
            axios.get(`${baseUrl}${groceryUrl}`)
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
        axios.get(`${baseUrl}${groceryUrl}`)
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
      
        // componentDidUpdate(prevProps, prevState){
        //     if (this.state !== prevState) {
        //         axios.get(`${baseUrl}${groceryUrl}`)
        //     .then(res => {
        //         this.setState({
        //             trips: res.data
        //         })
        //     })
        //     .catch(err => {
        //         this.setState('Data not found')
        //         console.log(err);
        //       })
        //     }
        // }
        
    
    render(){
        return (
            <div>
            <h3 className=''>Grocery Trips</h3>
            <ul>
                {this.state.trips !== null ? this.state.trips.map((data) => {
                    return (
                        <li key={data.id}>
                            <p>{data.name}</p>
                            <p>{data.location}</p>
                            <button onClick={()=> this.deleteUser(data.id)} >Delete</button>
                        </li>
                    );   
                }):<div>Loading trips</div>}
            </ul>
            </div>
        );
    }
    
}

export default GroceryShuttle;