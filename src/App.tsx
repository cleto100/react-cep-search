import { Redirect,Router } from '@reach/router';
import * as React from 'react';
import './App.css';
import Detail from './scenes/Detail';
import Home from './scenes/Home';

class App extends React.Component {
  public render() {
    return (
      <Router>
        <Redirect from='/' to='/home' noThrow={true} />
        <Home path='/home' />
        <Detail path='/detail' />
      </Router>
    );
  }
}

export default App;
