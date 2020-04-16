import React, {Component} from "react";
import { auth } from "../firebaseService";
import {Redirect} from "react-router-dom";
import {HOME} from "../../constants/routes";
import {getDataPageBlogFireBase} from "../database";
import {Backdrop} from "@material-ui/core";
import {Loading} from "../../page/Loading";
import {BlogNonFound} from "../../components/BlogNonFound";

interface IProp {
    existBlog?: any;
}
interface IState {
    existBlog?: any;
}

interface ParamTypes {
    userId: string
}

export const withCheckPage = (Component: any) => {
    return class WithCheckPage extends React.Component<any, IState> {
        private unsubscriber: any;
        constructor(props: any) {
            super(props);

            this.state = {
                existBlog: null
            };

        }



        public componentDidMount(): void {
            const {match} = this.props
            getDataPageBlogFireBase(match.params.userId)
                .then((snapshot: any) => {
                    if(snapshot.val() === null){
                        this.setState(() => ({ existBlog: false }));
                    } else {
                        this.setState(() => ({ existBlog: true }));
                    }
                })
                .catch(error => {
                    this.setState(() => ({ existBlog: false }));
                    console.error('error',error)
                })

        }

        public render() {
            const { existBlog } = this.state;
            console.log(existBlog)
            if(existBlog === null) {
                 return <Loading open={true}/>
            } else {
                if(existBlog === false){
                    return <BlogNonFound/>
                } else if(existBlog === true) {
                    return <Component />
                }
            }
        }
    }
}