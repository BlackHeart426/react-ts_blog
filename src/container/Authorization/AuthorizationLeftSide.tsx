import React from "react";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import {Divider, Grid, IconButton} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import {TwitterButtonLogin} from "../../components/Button/Auth/TwitterButtonLogin";
import {InstagramButtonLogin} from "../../components/Button/Auth/InstagramButtonLogin";
import VkButtonLogin from "../../components/Button/Auth/VkButtonLogin";
import {YoutubeButtonLogin} from "../../components/Button/Auth/YoutubeButtonLogin";
import {MailButtonLogin} from "../../components/Button/Auth/MailButtonLogin";
import {OkButtonLogin} from "../../components/Button/Auth/OkButtonLogin";
import {FacebookButtonLogin} from "../../components/Button/Auth/FacebookButtonLogin";
import GoogleButtonLogin from "../../components/Button/Auth/GoogleButtonLogin";

export function AuthorizationLeftSide(props: any) {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <TwitterButtonLogin />
                </Grid>
                <Grid item xs={3}>
                    <InstagramButtonLogin />
                </Grid>
                <Grid item xs={3}>
                    <FacebookButtonLogin />
                </Grid>
                <Grid item xs={3}>
                    <VkButtonLogin />
                </Grid>
                <Grid item xs={3}>
                    <YoutubeButtonLogin />
                </Grid>
                <Grid item xs={3}>
                    <MailButtonLogin />
                </Grid>
                <Grid item xs={3}>
                    <GoogleButtonLogin />
                </Grid>
                <Grid item xs={3}>
                    <OkButtonLogin />
                </Grid>
            </Grid>

            {/*<Grid container spacing={2}>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <TwitterButtonLogin />*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <InstagramButtonLogin />*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <FacebookButtonLogin />*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <VkButtonLogin />*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <YoutubeButtonLogin />*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <MailButtonLogin />*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <GoogleButtonLogin />*/}
            {/*    </Grid>*/}
            {/*    <Grid item xs={6}>*/}
            {/*        <OkButtonLogin />*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </>
    )
}