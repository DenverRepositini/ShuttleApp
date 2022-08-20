import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import './App.scss';
import ShuttleLocation from './pages/Shuttle/shuttleLocation';

class App extends React.Component {
  render (){
    return (
      <BrowserRouter>
        <div className='App'>
          {/* <Header/> */}
          <Switch>
            <Route path='/login' /> 
            <Route path='/shuttlelocation' component={ShuttleLocation}/>
          </Switch>
        </div>
      </BrowserRouter>
    )

  }
}

export default App;
