import React from "react";
import {SocialButtonStyle} from "./SocialButtonStyle";
import {blue} from "@material-ui/core/colors";
import InstagramIcon from '@material-ui/icons/Instagram';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export function InstagramButtonLogin(props: any) {
    const colorButton =  blue[500]
    const colorButtonHover =  blue[700]
    const icon = <InstagramIcon  fontSize="large"/>

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