import React, {Component} from "react";
import { auth } from "../firebaseService";
import {Redirect} from "react-router-dom";
import {HOME} from "../../constants/routes";
import {Loading} from "../../page/Loading";
import {BlogNonFound} from "../../components/BlogNonFound";

interface IProp {
    authUser?: any;
}
interface IState {
    authUser?: any;
}

export const withAuthorization = (Component: any) => {
    return class WithAuthorization extends React.Component<IProp, IState> {
        private unsubscriber: any;
        constructor(props: any) {
            super(props);

            this.state = {
                authUser: null
            };

        }


        public componentDidMount(): void {
            this.unsubscriber = auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState(() => ({ authUser }))
                    : this.setState(() => ({ authUser: false }));

            })
        }

        public componentWillUnmount(): void {
            this.unsubscriber();
        }

        public render() {
            const { authUser } = this.state;
            if(authUser === null) {
                return <Loading isLoading={true}/>
            } else {
                if(authUser === false){
                    return <Redirect to={HOME}/>
                } else if(authUser) {
                    return <Component authUser={authUser} />
                }
            }
        }
    }
}