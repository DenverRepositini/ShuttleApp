import React from 'react'
import axios from 'axios';
import './groceryShuttle.scss'
import DeleteIcon from '@mui/icons-material/Delete';

const baseUrl = 'http://localhost:8080';
const groceryUrl = '/shuttle/grocerytrips';

class GroceryShuttle extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            trips: null,
            name: null,
            location: null,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.addGrocery = this.addGrocery.bind(this);
      }

      handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
   
        this.setState({
            [name] : value
        });
      }

      addGrocery(){
        axios.post('http://localhost:8080' + groceryUrl, {
            name: this.state.name,
            location: this.state.location,
        })
        .then(res => {
            console.log(res);
            alert('Added to Trip')
            axios.get('http://localhost:8080' + groceryUrl)
            .then(res => {
                console.log(res);
                window.location.reload();
            })
            .catch(err => console.error(err))
        })
        .catch(err => console.error(err));

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
    
    render(){
        return (
            <>
            <div className='grocery' >
            <h3 className='grocery__title'>Grocery Trips</h3>
            <h4 className='grocery__date'>August 30th, 10am:</h4>
            <ul className='grocery__list'> 
                {this.state.trips !== null ? this.state.trips.map((data, i) => {
                    return (
                        <li className='grocery__list-item' key={data.id} style={{backgroundColor: i % 2=== 0 ? 'gray': 'whitesmoke'}}>
                            <p className='grocery__list-item__row'>{data.name}</p>
                            <p className='grocery__list-item__row'>{data.location}</p>
                            <DeleteIcon className='grocery__button' onClick={()=> this.deleteUser(data.id)} >Delete</DeleteIcon>
                        </li>
                    );   
                }):<div>Loading trips</div>}
            </ul>
            </div>
            <div className='addGrocery' >
                <form className='addGrocery__form' >
                <h3 className='addGrocery__title'>Join shuttle</h3>
                <div className='addGrocery__form__one' >
                    <label>Name</label>
                    <input type="text" name="name" className="addGrocery__form__one__name" 
                    id="email"
                    placeholder="Enter your name"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                    <label>Location</label>
                    <input type="text" name="location" className="addGrocery__form__one__location" 
                    id="location"
                    placeholder="Enter your location"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                </div>
                <div>
                    <input className='login__button' value='Add to trip' type='submit' onClick={this.addGrocery}></input>
                </div>
                </form>
            </div>
            </>
        );
    }
    
}

export default GroceryShuttle;