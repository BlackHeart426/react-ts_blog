import React, {useState} from "react";
import {AuthorizationLogin} from "./AuthorizationLogin";
import { AuthorizationSignUp } from "./AuthorizationSignUp";
import {AuthorizationRecoveryPassword} from "./AuthorizationRecoveryPassword";

export const AuthorizationRightSide: React.FC = (props: any) => {
    const [stateForm, setStateForm] = useState({login: true, signUp: false, recovery: false})
    const handleChangeForm = (name: any) => {
        name === 'login' && setStateForm({...stateForm, login: true, signUp: false, recovery: false})
        name === 'signUp' && setStateForm({...stateForm, login: false, signUp: true, recovery: false})
        name === 'recovery' && setStateForm({...stateForm, login: false, signUp: false, recovery: true})

    }
    return (
        <>
            {stateForm.login && <AuthorizationLogin onChangeForm={(name: any) => handleChangeForm(name)} />}
            {stateForm.signUp && <AuthorizationSignUp onChangeForm={(name: any) => handleChangeForm(name)} />}
            {stateForm.recovery && <AuthorizationRecoveryPassword onChangeForm={(name: any) => handleChangeForm(name)} />}
        </>
    )
}