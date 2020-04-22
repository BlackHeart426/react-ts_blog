import React from "react";
import {SocialButtonStyle} from "../SocialButtonStyle";
import {blue} from "@material-ui/core/colors";
import InstagramIcon from '@material-ui/icons/Instagram';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export function InstagramButtonLogin(props: any) {
    const colorButton =  blue[500]
    const colorBackground =  'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)'
    const colorButtonHover = 'radial-gradient(circle at 30% 107%, #e8e089 0%, #e0d885 5%, #da4d3f 45%,#ae1b81 60%,#1e45b7 90%);'
    const icon = <InstagramIcon  fontSize="large"/>

    const handleConnection = (name: any) => {
        console.log(name)
    }

    return (
        <SocialButtonStyle
            onConnection={() => handleConnection('twitter')}
            colorButton={colorButton}
            colorBackground={colorBackground}
            colorBorder={colorBackground}
            colorButtonHover={colorButtonHover}
            icon={icon} />
    )
}