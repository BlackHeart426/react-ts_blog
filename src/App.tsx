import React from 'react';
import './App.css';
import { Navbar } from './components/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { PageBlog } from './page/pageBlog';
import TemporaryDrawer from "./components/Drawer/Drawer";
import {makeStyles, Theme} from '@material-ui/core';

const App: React.FC = () => {
  return <div>
    <Navbar/>
    <TemporaryDrawer open={true}/>
    <div className="Layout">

        <main>
          <div>
            <Switch>
              <Route exact path="/:userId" component={PageBlog}/>
            </Switch>
          </div>
        </main>
    </div>
  </div>
}

export default App;
