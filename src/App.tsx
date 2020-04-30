import React, {Dispatch, useEffect, useState} from 'react';
import './App.css';
import  Navbar  from './components/Navbar/Navbar';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import TemporaryDrawer from "./components/Drawer/Drawer";
import {makeStyles, Theme, createMuiTheme, ThemeProvider} from '@material-ui/core';
import {green, grey, orange} from "@material-ui/core/colors";
import TemplatePage from './container/templatePage';
import {createStyles} from "@material-ui/core/styles";
import {
  HOME,
  PAGE_BLOG,
  SETTINGS,
  PROFILE
} from './constants/routes';
import {NonFound} from "./page/NonFound";
import Home from "./page/Home";
import {Settings} from "./container/Settings/settingsContainer";
import {Profile} from "./page/Profile";
import {auth} from "./firebase/firebaseService";
import { User } from 'firebase';
import {connect, MapDispatchToProps, RootStateOrAny} from 'react-redux';
import {autoLoginActionCreator, logoutActionCreator} from "./store/action/authorization";
import {AppState} from "./store/reducers/rootReducer";

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
      main: "#f15f2c",
    },
    secondary: {
      main: "#fff",
    }
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

const App: React.FC = (props: any) => {
  const classes = useStyles()
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {

    props.action.autoLogin()

  },[])

  return <div className={classes.root}>
    <ThemeProvider theme={mainTheme}>
      <Navbar/>
      <TemporaryDrawer/>
      <div className={classes.content}>
        <Switch>
          <Route exact path={HOME} component={Home}/>
          <Route exact path={PAGE_BLOG} component={TemplatePage}/>
          <Route exact path={SETTINGS} component={Settings}/>
            {/*<Route exact path={SETTINGS_SUBSCRIBERS} component={Settings}/>*/}
            {/*<Route exact path={SETTINGS_NOTIFICATIONS} component={Settings}/>*/}
            {/*<Route exact path={SETTINGS_APPS} component={Settings}/>*/}
          <Route exact path={PROFILE} component={Profile}/>
            {/*<Route exact path={SUBSCRIBERS} component={Profile}/>*/}
            {/*<Route exact path={WITHDRAWAL_METHODS} component={Profile}/>*/}
            {/*<Route exact path={PAYOUT_HISTORY} component={Profile}/>*/}
            <Route component={NonFound}/>
        </Switch>
      </div>
  </ThemeProvider>
  </div>
}

function mapStateToProps(state: AppState) {
  return {
    openDrawer: state.app.openDrawer
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    action: {
      autoLogin: () => dispatch(autoLoginActionCreator())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (App);
