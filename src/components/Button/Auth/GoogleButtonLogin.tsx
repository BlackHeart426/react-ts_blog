import React from "react";
import {SocialButtonStyle} from "../SocialButtonStyle";
import {blue, grey} from "@material-ui/core/colors";
import { Icon, InlineIcon } from '@iconify/react';
import googleIcon from '@iconify/icons-flat-color-icons/google';
import {authorizationGoogleActionCreator} from "../../../store/action/authorization";
import {connect} from "react-redux";

function GoogleButtonLogin(props: any) {
    const colorButton =  '#fff'
    const colorButtonHover =  grey[300]
    const icon = <Icon width={36} height={36} icon={googleIcon}/>

    const handleConnection = (name: any) => {
        props.action.authorizationGoogle()
    }

    return (
        <SocialButtonStyle
            onConnection={() => handleConnection('google')}
            colorButton={colorButton}
            disabled={false}
            colorBorder={colorButtonHover}
            colorBackground={colorButton}
            colorButtonHover={colorButtonHover}
            icon={icon} />
    )
}


function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            authorizationGoogle: () => dispatch(authorizationGoogleActionCreator())
        }
    }
}

export default connect(null, mapDispatchToProps)(GoogleButtonLogin)