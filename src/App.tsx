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
        <Route exact path={HOME} component={NonFound}/>
        <Route exact path={PAGE_BLOG} component={ShablonPage}/>
        <Route exact path={SETTINGS} component={NonFound}/>
        <Route exact path={SETTINGS_SUBSCRIBERS} component={NonFound}/>
        <Route exact path={SETTINGS_NOTIFICATIONS} component={NonFound}/>
        <Route exact path={SETTINGS_APPS} component={NonFound}/>
        <Route exact path={STATISTICS} component={NonFound}/>
        <Route exact path={SUBSCRIBERS} component={NonFound}/>
        <Route exact path={WITHDRAWAL_METHODS} component={NonFound}/>
        <Route exact path={PAYOUT_HISTORY} component={NonFound}/>
      </Switch>
  </ThemeProvider>
  </div>
}

export default App;
