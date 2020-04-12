import React, {useEffect, useState} from "react";
import AuthorizationLogin from "./AuthorizationLogin";
import AuthorizationSignUp from "./AuthorizationSignUp";
import AuthorizationRecoveryPassword from "./AuthorizationRecoveryPassword";

export function AuthorizationRightSide(props: any){
    const {onHideModal, form} = props;
    const [stateForm, setStateForm] = useState({login: true, signUp: false, recovery: false})

    useEffect(()=>{
        handleChangeForm(form)
    },[form])
    const handleChangeForm = (name: any) => {
        name === 'login' && setStateForm({...stateForm, login: true, signUp: false, recovery: false})
        name === 'signUp' && setStateForm({...stateForm, login: false, signUp: true, recovery: false})
        name === 'recovery' && setStateForm({...stateForm, login: false, signUp: false, recovery: true})

    }
    return (
        <>
            {stateForm.login && <AuthorizationLogin onHideModal={onHideModal} onChangeForm={(name: any) => handleChangeForm(name)} />}
            {stateForm.signUp && <AuthorizationSignUp onHideModal={onHideModal} onChangeForm={(name: any) => handleChangeForm(name)} />}
            {stateForm.recovery && <AuthorizationRecoveryPassword onHideModal={onHideModal} onChangeForm={(name: any) => handleChangeForm(name)} />}
        </>
    )
}

