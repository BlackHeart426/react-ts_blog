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
import {HOME, PAGE_BLOG, SETTINGS, SETTINGS_SUBSCRIBERS, SETTINGS_NOTIFICATIONS, SETTINGS_APPS, STATISTICS, SUBSCRIBERS, WITHDRAWAL_METHODS, PAYOUT_HISTORY} from './routes/routes';
import {NonFound} from "./page/NonFound";
import {Home} from "./page/Home";
import {Settings} from "./page/Settings";
import {Profile} from "./page/Profile";

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
        background: grey[200]
      },
      content: {
        paddingTop: '60px'
      }
    })
)

const App: React.FC = () => {
  const classes = useStyles()
  return <div className={classes.root}>
    <ThemeProvider theme={mainTheme}>
      <Navbar/>
      <TemporaryDrawer open={true}/>
      <div className={classes.content}>
        <Switch>
          <Route exact path={HOME} component={Home}/>
          <Route exact path={PAGE_BLOG} component={ShablonPage}/>
          <Route exact path={SETTINGS} component={Settings}/>
            <Route exact path={SETTINGS_SUBSCRIBERS} component={Settings}/>
            <Route exact path={SETTINGS_NOTIFICATIONS} component={Settings}/>
            <Route exact path={SETTINGS_APPS} component={Settings}/>
          <Route exact path={STATISTICS} component={Profile}/>
            <Route exact path={SUBSCRIBERS} component={Profile}/>
            <Route exact path={WITHDRAWAL_METHODS} component={Profile}/>
            <Route exact path={PAYOUT_HISTORY} component={Profile}/>
            <Route component={NonFound}/>
        </Switch>
      </div>
  </ThemeProvider>
  </div>
}

export default App;
