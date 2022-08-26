import React from 'react';
import axios from 'axios';


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
            <h3>Signup</h3>
            <form>
                <div>
                    <label>Name</label>
                    <input type="text" name="name" className="" 
                    id="name"
                    placeholder="Name"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                    <label>Email</label>
                    <input type="text" name="email" className="login_email" 
                    id="email"
                    placeholder="Email"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                    <label>Location
                        <select
                        name='location'
                        className="login_location" 
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
                    {/* <input type="text" name="location" 
                    className="login_location" 
                    id="location"
                    placeholder="Residence Locatioin"
                    onChange={this.handleInputChange}
                    required>
                    </input> */}
                    <label>Password</label>
                    <input type="password" name="password" className="login_password" 
                    id="password"
                    placeholder="Enter your password"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                </div>
                <div>
                    <input value='Register' type='submit' onClick={this.signup}></input>
                </div>
            </form>
            </>
        )
    }
    
}

export default Signup;