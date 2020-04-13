import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, Divider} from "@material-ui/core";
import { AuthorizationRightSide } from "./AuthorizationRightSide";
import { AuthorizationLeftSide } from "./AuthorizationLeftSide";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootForm: {
            width: 800,
            // display: 'none',
            // [theme.breakpoints.up('md')]: {
            //     display: 'block',
            //     height: '30px'
            // },
        },
        leftSide: {
            width: 370,
            padding: 10,
            marginRight: 10
        } ,
        rightSide: {
            width: 350,
            padding: 10,
            marginLeft: 20
        }
        }
    )
)

export function AuthorizationForm(props: any) {
    const classes = useStyles()
    const {onHideModal, form} = props;
    return (
        <Grid className={classes.rootForm} container alignItems="center">
            <div className={classes.leftSide} >
                <div style={{padding:10}}>
                    <AuthorizationLeftSide onHideModal={onHideModal}/>
                </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.rightSide}>
                <AuthorizationRightSide form={form} onHideModal={onHideModal}/>
            </div>
        </Grid>
    )
}