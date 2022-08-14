import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import './App.scss';

class App extends React.Component {
  render (){
    return (
      <BrowserRouter>
        <div className='App'>
          <Header/>
          <Switch>
            <Route path='/login' />
          </Switch>
        </div>
      </BrowserRouter>
    )

  }
}

export default App;
