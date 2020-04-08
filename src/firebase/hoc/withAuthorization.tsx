import React, {Component} from "react";
import { auth } from "../firebaseService";
import {Redirect} from "react-router-dom";
import {HOME} from "../../routes/routes";
import {connect} from "react-redux";
import {isAuthorization} from "../../store/action/authorization";

interface IProp {
    authUser?: any;
}
interface IState {
    authUser?: any;
}

export const withAuthorization = (Component: any) => {
    return class WithAuthorization extends React.Component<IProp, IState> {
        constructor(props: any) {
            super(props);

            this.state = {
                authUser: null
            };
        }

        public componentDidMount(): void {
           auth.onAuthStateChanged(authUser => {
               authUser
                   ? this.setState(() => ({ authUser }))
                   : this.setState(() => ({ authUser: null }));

           })
        }

        public render() {
            const { authUser } = this.state;
            if(!authUser ) {
                return <Redirect to={HOME}/>
            }
            return (
                <Component authUser={authUser} />
            )
        }
    }
}