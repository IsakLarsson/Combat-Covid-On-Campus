import "./App.css";
import Map from './pages/Map'
import Login from './pages/Login'
import Landing from './pages/Landing'
import CheckIn from './pages/CheckIn'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


const axios = require("axios");

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" exact component={Landing}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/checkin" exact component={CheckIn}/>
            <Route path="/map" exact component={Map}/>
        </Switch>
    </Router>


   
  );
}

export default App;