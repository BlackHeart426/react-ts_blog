import React from "react";
import {SocialButtonStyle} from "./SocialButtonStyle";
import {blue} from "@material-ui/core/colors";
import {OKIcon} from 'react-share';

export function OkButtonLogin(props: any) {
    const colorButton =  blue[500]
    const colorButtonHover =  blue[700]
    const icon = <OKIcon round size={50}/>

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