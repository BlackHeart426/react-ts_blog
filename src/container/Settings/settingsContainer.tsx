import React from "react";
import {withAuthorization} from "../../firebase/hoc/withAuthorization";
import {SettingsComponents} from "../../page/Settings";

const SettingsContainer: React.FC = (props) => {

    //func
    //connect

    const user = {
        name: "Black"
    }

    return (
        <SettingsComponents/>
    )
}

export const Settings = withAuthorization(SettingsContainer)