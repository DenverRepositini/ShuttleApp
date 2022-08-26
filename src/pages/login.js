import React from 'react';
import axios from 'axios';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.login = this.login.bind(this);

    }

  
    handleInputChange(e) {
        const value = e.target.value;
        const name = e.target.name;
   
        this.setState({
            [name] : value
        });
    }

    login(e) {
        e.preventDefault();
        axios.post('http://localhost:8080/login', {
            email: this.state.email,
            password: this.state.password
        })
        .then(res => {
            console.log(res);
            if (res.data !== 'Invalid credentials') {
                alert('Login successful')
                this.props.history.push('/')
            } else {
                alert(res.data)
                
            }
        })
        .catch(err => console.log(err));
    }

    toggleClass(){

    }

    render(){
        return (
            <>
            <h3>Login</h3>
            <form>
                <div>
                    <label>Email</label>
                    <input type="text" name="email" className="login_email" 
                    id="email"
                    placeholder="Enter your email here"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                    <label>Password</label>
                    <input type="password" name="password" className="login_password" 
                    id="password"
                    placeholder="Enter your password"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                </div>
                <div>
                    {/* <button onClick={this.login} >login</button> */}
                    <input value='Log In' type='submit' onClick={this.login}></input>
                </div>
            </form>
            </>
        )
    }
    
}

export default Login;