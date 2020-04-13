import React from "react";
import {SocialButtonStyle} from "./SocialButtonStyle";
import {blue} from "@material-ui/core/colors";
import {OKIcon} from 'react-share';

export function OkButtonLogin(props: any) {
    const colorButton =  '#f2720c'
    const colorButtonHover =  '#f2720c'
    const icon = <OKIcon round size={50}/>

    const handleConnection = (name: any) => {
        console.log(name)
    }

    return (
        <SocialButtonStyle
            onConnection={() => handleConnection('twitter')}
            colorButton={colorButton}
            colorBorder={colorButton}
            colorBackground={colorButton}
            colorButtonHover={colorButtonHover}
            icon={icon} />
    )
}