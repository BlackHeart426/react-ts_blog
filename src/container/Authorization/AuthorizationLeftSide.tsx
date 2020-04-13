import React from "react";
import Button from "@material-ui/core/Button";
import {createStyles, makeStyles, Theme, withStyles} from "@material-ui/core/styles";
import {Divider, Grid, IconButton} from "@material-ui/core";
import {blue} from "@material-ui/core/colors";
import {TwitterButtonLogin} from "../../components/Button/TwitterButtonLogin";
import {InstagramButtonLogin} from "../../components/Button/InstagramButtonLogin";
import VkButtonLogin from "../../components/Button/VkButtonLogin";
import {YoutubeButtonLogin} from "../../components/Button/YoutubeButtonLogin";
import {MailButtonLogin} from "../../components/Button/MailButtonLogin";
import {OkButtonLogin} from "../../components/Button/OkButtonLogin";
import {FacebookButtonLogin} from "../../components/Button/FacebookButtonLogin";
import GoogleButtonLogin from "../../components/Button/GoogleButtonLogin";

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