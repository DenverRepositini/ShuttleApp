import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
// import './App.scss';
import Header from './components/Header/header';
import ShuttleLocation from './pages/Shuttle/shuttleLocation';
import HomePage from './pages/home';
import WorkShuttle from './pages/Shuttle/workShuttle';
import GroceryShuttle from './pages/Shuttle/groceryShuttle';
import Driver from './pages/Shuttle/driver';

class App extends React.Component {
  render (){
    return (
      <BrowserRouter>
        <div className='App'>
          {/* <Header/> */}
          <Switch>
            <Route path='/login' /> 
            <Route path='/' exact component={HomePage} />
            <Route path='/workshuttle' component={WorkShuttle}/>
            <Route path='/groceryshuttle' component={GroceryShuttle}/>
            <Route path='/shuttlelocation' component={ShuttleLocation}/>
            <Route path='/driver' component={Driver}/>
          </Switch>
        </div>
      </BrowserRouter>
    )

  }
}

export default App;
