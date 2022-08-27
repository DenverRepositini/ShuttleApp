import React from 'react';
import axios from 'axios';
import './signup.scss'


class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: null,
            email: null,
            location: undefined,
            password: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.signup = this.signup.bind(this);
    }

    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
   
        this.setState({
            [name] : value
        });
    }

    signup(e) {
        e.preventDefault();
        axios.post('http://localhost:8080/signup', {
            name: this.state.name,
            email: this.state.email,
            location: this.state.location,
            password: this.state.password
        })
        .then(res => {
            console.log(res);
            if (res.data !== 'Signup unsuccessful') {
                alert('Signup successful')
                this.props.history.push('/login')
            } else {
                alert('Enter value for all fields')
            }
        })
        .catch(err => console.log(err));
    }

    render(){
        return (
            <>
            <div className='signup' >
                <form className='signup__form' >
                    <h3 className='signup__title' >Register</h3>
                    <div className='signup__info' >
                        <label>Name</label>
                        <input type="text" name="name" className="signup__info__name" 
                        id="name"
                        placeholder="Name"
                        onChange={this.handleInputChange}
                        required>
                        </input>
                        <label>Email</label>
                        <input type="text" name="email" className="signup__info__email" 
                        id="email"
                        placeholder="Email"
                        onChange={this.handleInputChange}
                        required>
                        </input>
                        <label>Location
                            <select
                            name='location'
                            className="signup__info__location" 
                            id="location"
                            value={this.state.location} 
                            onChange={this.handleInputChange}
                            required>
                                <option defaultValue={null} ></option>
                                <option value= 'aframes'>A-Frames</option>
                                <option value = 'chucktown'>Chucktown</option>
                                <option value = 'moraine'>Moraine</option>
                            </select>
                            
                        </label>
                        <label>Password</label>
                        <input type="password" name="password" className="signup__info__password" 
                        id="password"
                        placeholder="Enter your password"
                        onChange={this.handleInputChange}
                        required>
                        </input>
                    </div>
                    <div>
                        <input className='signup__button' value='Register' type='submit' onClick={this.signup}></input>
                    </div>
                </form>
            </div>
            </>
        )
    }
    
}

export default Signup;