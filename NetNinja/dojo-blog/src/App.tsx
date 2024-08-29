import React from 'react';
import logo from './logo.svg';
import { Navbar } from './components/Navbar';
import { Home } from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
