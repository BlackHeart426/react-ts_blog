import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Divider} from "@material-ui/core";
import { AuthorizationRightSide } from "./AuthorizationRightSide";
import { AuthorizationLeftSide } from "./AuthorizationLeftSide";


export function AuthorizationForm(props: any) {
    const {onHideModal, form} = props;
    return (
        <Grid style={{width: 800}} container alignItems="center">
            <div style={{width: 370, padding: 10, marginRight: 10}}>
                <div style={{padding:10}}>
                    <AuthorizationLeftSide onHideModal={onHideModal}/>
                </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div style={{width: 350, padding: 10, marginLeft: 20}}>
                <AuthorizationRightSide form={form} onHideModal={onHideModal}/>
            </div>
        </Grid>
    )
}