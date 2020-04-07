import React from 'react';
import './App.css';
import  Navbar  from './components/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { PageBlog } from './page/pageBlog';
import TemporaryDrawer from "./components/Drawer/Drawer";
import {makeStyles, Theme, createMuiTheme, ThemeProvider} from '@material-ui/core';
import {orange} from "@material-ui/core/colors";

const darkTheme = createMuiTheme({
  palette: {
    secondary: {
      main: orange[500],
    },
  },
});

const mainTheme = createMuiTheme({
  palette: {
    primary: {
      main: orange[400],
    },
  },
});

const App: React.FC = () => {
  return <ThemeProvider theme={mainTheme}>
    <Navbar/>
    <TemporaryDrawer open={true}/>
    <div>

        <main>
          <div>
            <Switch>
              <Route exact path="/:userId" component={PageBlog}/>
            </Switch>
          </div>
        </main>
    </div>
  </ThemeProvider>
}

export default App;
