import React from 'react';
import axios from 'axios';
import './workShuttle.scss'
import DeleteIcon from '@mui/icons-material/Delete';

const baseUrl = 'http://localhost:8080'
const worktripsUrl = '/shuttle/worktrips';


class WorkShuttle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            trips: null,
            name: null,
            location: null,
            time: null
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addUser = this.addUser.bind(this);
      }

      
    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
   
        this.setState({
            [name] : value
        });
    }

    addUser(e){
        // e.preventDefault();
        axios.post('http://localhost:8080/shuttle/worktrips', {
            name: this.state.name,
            location: this.state.location,
            time: this.state.time
        })
        .then(res => {
            console.log(res);
            alert('Added to Trip')
            axios.get('http://localhost:8080/shuttle/worktrips')
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err));

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
            <>
            <div className='work' >
            <h3 className='work__title'>Work Trips</h3>
            <h4 className='work__date' >{new Date().toDateString()} </h4>
            <ul className='work__list' >
                {this.state.trips !== null ? this.state.trips.map((data, i) => {
                    return (
                        <li className='work__list-item' key={data.id} style={{backgroundColor: i % 2=== 0 ? 'gray': 'whitesmoke'}} >
                            <p className='work__list-item__row'>{data.name}</p>
                            <p className='work__list-item__row'>{data.location}</p>
                            <p className='work__list-item__row'>{data.time}</p>
                            <DeleteIcon className='work__button' onClick={()=> this.deleteUser(data.id)} >Delete</DeleteIcon>
                        </li>
                    );   
                }):<div>Loading trips</div>}
            </ul>
            </div>
            <div className='addUser' >
                <form className='addUser__form' >
                <h3 className='addUser__title'>Join trip</h3>
                <div className='addUser__form__one' >
                    <label>Name</label>
                    <input type="text" name="name" className="addUser__form__one__name" 
                    id="email"
                    placeholder="Enter your name"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                    <label>Location</label>
                    <input type="text" name="location" className="addUser__form__one__location" 
                    id="location"
                    placeholder="Enter your location"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                    <label>Time</label>
                    <input type="text" name="time" className="addUser__form__one__time" 
                    id="time"
                    placeholder="Pickup time (00:00)"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                </div>
                <div>
                    <input className='login__button' value='Add to trip' type='submit' onClick={this.addUser}></input>
                </div>
                </form>
            </div>
            
            </>
        );
    }
    
}

export default WorkShuttle;