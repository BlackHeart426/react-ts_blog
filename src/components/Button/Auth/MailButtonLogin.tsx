import React from "react";
import {SocialButtonStyle} from "../SocialButtonStyle";
import {blue} from "@material-ui/core/colors";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

export function MailButtonLogin(props: any) {
    const colorButton =  '#005ff9'
    const colorButtonHover =  '#054bbb'
    const icon = <AlternateEmailIcon  fontSize="large"/>

    const handleConnection = (name: any) => {
        console.log(name)
    }

    return (
        <SocialButtonStyle
            onConnection={() => handleConnection('twitter')}
            colorButton={colorButton}
            disabled={false}
            colorBorder={colorButton}
            colorBackground={colorButton}
            colorButtonHover={colorButtonHover}
            icon={icon} />
    )
}
