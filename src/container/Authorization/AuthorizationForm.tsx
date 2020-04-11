import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Divider} from "@material-ui/core";
import {AuthorizationSociety} from "../../components/Authorization/AuthorizationSociety";
import { AuthorizationRightSide } from "./AuthorizationRightSide";
import { AuthorizationLeftSide } from "./AuthorizationLeftSide";


export const AuthorizationForm: React.FC = () => {
    return (
        <Grid style={{width: 800}} container alignItems="center">
            <div style={{width: 370, padding: 10, marginRight: 10}}>
                <div style={{padding:10}}>
                    <AuthorizationLeftSide/>
                </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div style={{width: 350, padding: 10, marginLeft: 20}}>
                <AuthorizationRightSide/>
            </div>
        </Grid>
    )
}