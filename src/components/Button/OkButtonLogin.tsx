import React from "react";
import {SocialButtonStyle} from "./SocialButtonStyle";
import { Icon, InlineIcon } from '@iconify/react';
import odnoklassnikiIcon from '@iconify/icons-cib/odnoklassniki';

export function OkButtonLogin(props: any) {
    const colorButton =  '#f2720c'
    const colorButtonHover =  '#cb5f09'
    const icon = <Icon width={36} height={36} icon={odnoklassnikiIcon} color={'white'}/>

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