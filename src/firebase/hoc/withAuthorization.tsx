import React, {Component} from "react";
import { auth } from "../firebaseService";
import {withRouter} from "react-router-dom";
import {HOME} from "../../routes/routes";

interface IProp {
    history?: any;
    authUser?: any;
}
interface IState {
    authUser?: any;
}

export const withAuthorization = (condition: any) => (Component: any) => {
    class WithAuthorization extends React.Component<IProp, IState> {
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
               if(!condition(authUser)) {
                   this.props.history(HOME)
               }
           })
        }

        public render() {
            const { authUser } = this.state;

            return (
                <Component authUser={authUser} />
            )
        }
    }

    return withRouter(WithAuthorization as any)
}