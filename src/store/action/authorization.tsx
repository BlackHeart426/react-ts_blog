import {IS_AUTHENTICATION} from "../types";
import {doAuthStateChange, doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword} from "../../firebase/auth";
import { Dispatch } from "redux";

export const authorizationActionCreator = (email: string, password: string, isLogin: boolean) => {
    return async (dispatch: Dispatch) => {
        const authData = {
            email, password,
            returnSecureToken: true
        }
        if (isLogin) {
            doSignInWithEmailAndPassword(email, password)
                .then(function (firebaseUser) {
                    console.log(firebaseUser)
                    const dataUser = doAuthStateChange()
                    // dispatch(authSuccess(token))
                    // dispatch(autoLogout(expirationDate))
                })
                .catch(
                    error => console.log('messageError', error.message)
                )
        } else {
            doCreateUserWithEmailAndPassword(email, password)
                .then(function (firebaseUser) {
                    console.log(firebaseUser)
                    doAuthStateChange()
                    // dispatch(authSuccess(token))
                    // dispatch(autoLogout(expirationDate))
                })
                .catch(
                    error => console.log('messageError', error.message)
                )
        }

    }
}