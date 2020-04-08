import React from "react";
import {withAuthorization} from "../firebase/hoc/withAuthorization";

const SettingsComponents: React.FC = () => {
    return <div>SETTINGS</div>
}

export const Settings = withAuthorization(SettingsComponents)