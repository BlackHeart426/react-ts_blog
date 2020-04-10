import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {HOME} from "../../constants/routes";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import FormControl from "@material-ui/core/FormControl";

interface IProp {
    authUser?: any;
}
interface IState {
    authUser?: any;
}

export const withDialogAuth = (Component: any) => {
    return class WithDialogAuth extends React.Component<IProp, IState> {
        constructor(props: any) {
            super(props);
        }
        public render() {
            const { authUser } = this.state;
            if(!authUser ) {
                return <Redirect to={HOME}/>
            }
            return (
                <>
                    <Component  />
                    <Grid container>
                        <Grid item xs >
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </>

            )
        }
    }
}