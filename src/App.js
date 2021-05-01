import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/Home';
import StoryDetails from './components/StoryDetails';


function App() {
  return (
    <Router>            
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route exact path='/details/:id' component={StoryDetails}></Route>
      </Switch>
    </Router>
  );
}

export default App;

