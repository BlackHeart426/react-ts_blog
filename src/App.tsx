import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import { Route, Switch} from "react-router-dom";

const App: React.FC = () => {
  return <div className="grey lighten-3">
  <Navbar/>
  <div className="container ">
    <Switch>

    </Switch>
  </div>
  </div>
}

export default App;
