import React, {Component} from "react";
import { auth } from "../firebaseService";
import {HOME} from "../../routes/routes";

interface IProp {
    history?: any;
}

export const withAuthorization = (condition: any) => (Component: any) => {
    class WithAuthorization extends React.Component<IProp, {}> {
        public componentDidMount(): void {
           auth.onAuthStateChanged(authUser => {
               if(!condition(authUser)) {
                   this.props.history(HOME)
               }
           })
        }

        public render() {
            return (
                {authUser }
            )
        }
    }
}