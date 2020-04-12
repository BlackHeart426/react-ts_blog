import React from "react";
import {SocialButtonStyle} from "./SocialButtonStyle";
import {blue, grey} from "@material-ui/core/colors";
import { Icon, InlineIcon } from '@iconify/react';
import googleIcon from '@iconify/icons-flat-color-icons/google';

export function GoogleButtonLogin(props: any) {
    const colorButton =  '#fff'
    const colorButtonHover =  grey[300]
    const icon = <Icon width={50} height={50} icon={googleIcon}/>

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