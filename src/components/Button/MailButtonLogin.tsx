import React from "react";
import {SocialButtonStyle} from "./SocialButtonStyle";
import {blue} from "@material-ui/core/colors";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';

export function MailButtonLogin(props: any) {
    const colorButton =  blue[500]
    const colorButtonHover =  blue[700]
    const icon = <AlternateEmailIcon  fontSize="large"/>

    const handleConnection = (name: any) => {
        console.log(name)
    }

    return (
        <SocialButtonStyle
            onConnection={() => handleConnection('twitter')}
            colorButton={colorButton} 
            colorButtonHover={colorButtonHover}
            icon={icon} />
    )
}