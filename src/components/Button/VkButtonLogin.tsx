import React from "react";
import {SocialButtonStyle} from "./SocialButtonStyle";
import {blue} from "@material-ui/core/colors";
import Icon36LogoVk from '@vkontakte/icons/dist/36/logo_vk';

export function VkButtonLogin(props: any) {
    const colorButton =  blue[500]
    const colorButtonHover =  blue[700]
    const icon = <Icon36LogoVk/>

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