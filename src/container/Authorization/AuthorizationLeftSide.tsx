import React from "react";
import Button from "@material-ui/core/Button";
import {Icon} from "@iconify/react";
import googleIcon from "@iconify/icons-flat-color-icons/google";
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import AppleIcon from '@material-ui/icons/Apple';
import {
    FacebookLoginButton,
    GoogleLoginButton,
    MicrosoftLoginButton,
    TwitterLoginButton
} from "react-social-login-buttons";
import AuthorizationLogin from "./AuthorizationLogin";

export function AuthorizationLeftSide(props: any) {
    const {onHideModal} = props;
    const handleGoogle = () => {
        // props.action.authorizationGoogle()
        // handleClose()
    };

    return (
        <>
            <GoogleLoginButton onClick={() => handleGoogle()} >
                <span>Google+</span>
            </GoogleLoginButton>
            <FacebookLoginButton onClick={() => alert("Hello")} >
                <span>Facebook</span>
            </FacebookLoginButton>
            <TwitterLoginButton onClick={() => alert("Hello")}>
                <span>Twitter</span>
            </TwitterLoginButton>
            <MicrosoftLoginButton>
                <span>Microsoft</span>
            </MicrosoftLoginButton>
        </>
    )
}