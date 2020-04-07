import React from 'react';
import './App.css';
import  Navbar  from './components/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import { PageBlog } from './page/pageBlog';
import TemporaryDrawer from "./components/Drawer/Drawer";
import {makeStyles, Theme, createMuiTheme, ThemeProvider} from '@material-ui/core';
import {grey, orange} from "@material-ui/core/colors";
import { ShablonPage } from './components/shablonPage';
import {createStyles} from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root : {
        // position: 'relative',
        background: grey[200]
      }
    })
)

const App: React.FC = () => {
  const classes = useStyles()
  return <div className={classes.root}>
    <ThemeProvider theme={mainTheme}>
      <Navbar/>
      <TemporaryDrawer open={true}/>
      <Switch>
        <Route exact path="/:userId" component={ShablonPage}/>
      </Switch>
  </ThemeProvider>
  </div>
}

export default App;
