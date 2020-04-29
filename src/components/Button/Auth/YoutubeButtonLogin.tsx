import React from "react";
import {SocialButtonStyle} from "../SocialButtonStyle";
import {blue, red} from "@material-ui/core/colors";
import YouTubeIcon from '@material-ui/icons/YouTube';

export function YoutubeButtonLogin(props: any) {
    const colorButton =  '#ff0000'
    const colorButtonHover =  red[700]
    const icon = <YouTubeIcon  fontSize="large"/>

    const handleConnection = (name: any) => {
        console.log(name)
    }

    return (
        <SocialButtonStyle
            onConnection={() => handleConnection('twitter')}
            colorButton={colorButton}
            disabled={true}
            colorBorder={colorButton}
            colorBackground={colorButton}
            colorButtonHover={colorButtonHover}
            icon={icon} />
    )
}