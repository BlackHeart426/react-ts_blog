import {IS_AUTHENTICATED} from "../types";
import {
    doAuthStateChange,
    doCreateUserWithEmailAndPassword, doGoogleSignIn, doPasswordReset,
    doSignInWithEmailAndPassword,
    doSignOut
} from "../../firebase/auth";
import { Dispatch } from "redux";
import firebase from "firebase";
import {TOKEN, USERID, EXPIRATIONDATE, EMAIL} from "../../constants/localStorage";

interface IUserData {
    token: string,
    expirationDate: string
}

export const authorizationGoogleActionCreator = () => {
    return async (dispatch: any) => {
        doGoogleSignIn()
            .then(result => {
                doAuthStateChange((dataUser: IUserData)=>{
                    dispatch(isAuthenticatedActionCreator(dataUser.token))
                })
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export const autoLoginActionCreator = () => {
    return async (dispatch: any) => {
        const token = localStorage.getItem(TOKEN)
        if(!token) {
            dispatch(logoutActionCreator())
        } else {
           dispatch(isAuthenticatedActionCreator(token))
        }
    }
}

export const logoutActionCreator = () => {
    return async (dispatch: Dispatch) => {
        doSignOut()
            .catch(
                error => console.log('messageError', error.message)
            )
        dispatch(isAuthenticatedActionCreator(null))
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(USERID)
        localStorage.removeItem(EXPIRATIONDATE)
        localStorage.removeItem(EMAIL)
    }
}

export const authorizationActionCreator = (email: string, password: string, isLogin: boolean) => {
    return async (dispatch: Dispatch) => {
        if (isLogin) {
            doSignInWithEmailAndPassword(email, password)
                .then(function (firebaseUser: firebase.auth.UserCredential) {
                    console.log(firebaseUser)
                    doAuthStateChange((dataUser: IUserData)=>{
                        dispatch(isAuthenticatedActionCreator(dataUser.token))
                    })
                })
                .catch(
                    error => console.log('messageError', error.message)
                )
        } else {
            doCreateUserWithEmailAndPassword(email, password)
                .then(function (firebaseUser: firebase.auth.UserCredential) {
                    console.log(firebaseUser)
                    doAuthStateChange((dataUser: IUserData)=>{
                        dispatch(isAuthenticatedActionCreator(dataUser.token))
                    })
                })
                .catch(
                    error => console.log('messageError', error.message)
                )
        }

    }
}

export const resetPasswordActionCreator = (email: string) => {
    return async (dispatch: Dispatch) => {
            doPasswordReset(email)
                .then( info => {
                    console.log(info)
                    }
                )
                .catch(error => {
                    console.log(error)
                })

        }
}

export function isAuthenticatedActionCreator(token: string|null) {
    return {
        type: IS_AUTHENTICATED,
        payload: token
    }
}