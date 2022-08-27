import React from 'react';
import axios from 'axios';
import './login.scss'

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
            <div className='login' >
                <form className='login__form' >
                <h3 className='login__title'>Account Log In</h3>
                <div className='login__form__one' >
                    <label>Username</label>
                    <input type="text" name="email" className="login__form__one__email" 
                    id="email"
                    placeholder="Enter your email here"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                    <label>Password</label>
                    <input type="password" name="password" className="login__form__one__password" 
                    id="password"
                    placeholder="Enter your password"
                    onChange={this.handleInputChange}
                    required>
                    </input>
                </div>
                <div>
                    {/* <button onClick={this.login} >login</button> */}
                    <input className='login__button' value='Log In' type='submit' onClick={this.login}></input>
                </div>
                </form>
            </div>
        </>
        )
    }
    
}

export default Login;