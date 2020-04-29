import React from "react";
import {SocialButtonStyle} from "../SocialButtonStyle";
import {blue} from "@material-ui/core/colors";
import Icon36LogoVk from '@vkontakte/icons/dist/36/logo_vk';
import {
    authorizationActionCreator,
    authorizationGoogleActionCreator,
    authorizationVkActionCreator
} from "../../../store/action/authorization";
import {connect} from "react-redux";

function VkButtonLogin(props: any) {
    const colorButton =  '#4a76a8'
    const colorButtonHover =  '#3a5b82'
    const icon = <Icon36LogoVk/>

    const handleConnection = (name: any) => {
        props.action.authorizationVk()
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

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            authorizationVk: () => dispatch(authorizationVkActionCreator())
        }
    }
}

export default connect(null, mapDispatchToProps)(VkButtonLogin)