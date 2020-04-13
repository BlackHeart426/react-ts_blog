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

const TwitterButton = withStyles((theme: Theme) => ({
    root: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
        '&:hover': {
            backgroundColor: blue[700],
        },
    },
}))(Button);

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        buttonGoogle: {
            width: '70px',
            height: '70px',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
        },
        }
    )
)
export function AuthorizationLeftSide(props: any) {
    const classes = useStyles()
    const {onHideModal} = props;

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
                    <GoogleButtonLogin onC />
                </Grid>
                <Grid item xs={3}>
                    <OkButtonLogin />
                </Grid>
            </Grid>

            {/*<GoogleLoginButton onClick={() => handleGoogle()} >*/}
            {/*    <span>Google+</span>*/}
            {/*</GoogleLoginButton>*/}
            {/*<FacebookLoginButton onClick={() => alert("Hello")} >*/}
            {/*    <span>Facebook</span>*/}
            {/*</FacebookLoginButton>*/}
            {/*<TwitterLoginButton onClick={() => alert("Hello")}>*/}
            {/*    <span>Twitter</span>*/}
            {/*</TwitterLoginButton>*/}
            {/*<MicrosoftLoginButton>*/}
            {/*    <span>Microsoft</span>*/}
            {/*</MicrosoftLoginButton>*/}
        </>
    )
}