import React from "react";
import {SocialButtonStyle} from "./SocialButtonStyle";
import {blue} from "@material-ui/core/colors";
import Icon36LogoVk from '@vkontakte/icons/dist/36/logo_vk';

export function VkButtonLogin(props: any) {
    const colorButton =  '#4a76a8'
    const colorButtonHover =  '#3a5b82'
    const icon = <Icon36LogoVk/>

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