import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { PageBlog } from './page/pageBlog';
import TemporaryDrawer from "./components/Drawer/Drawer";

const App: React.FC = () => {
  return <div className="grey lighten-3">
    <Navbar/>
    <TemporaryDrawer open={true}/>
    <div className="Layout">
      <BrowserRouter>
        <Switch>
          <Route exact path="/:userId" component={PageBlog}/>
        </Switch>
      </BrowserRouter>
    </div>
  </div>
}

export default App;
