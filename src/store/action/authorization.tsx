import {IS_AUTHENTICATED} from "../types";
import {
    doAuthStateChange,
    doCreateUserWithEmailAndPassword,
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
        function isAuthDispatch(dataUser: IUserData) {
            console.log(dataUser)
            dispatch(isAuthenticatedActionCreator(dataUser.token))
            // dispatch(autoLogoutActionCreator(dataUser.expirationDate))
        }

        if (isLogin) {
            doSignInWithEmailAndPassword(email, password)
                .then(function (firebaseUser: firebase.auth.UserCredential) {
                    console.log(firebaseUser)
                    doAuthStateChange((dataUser: IUserData)=>isAuthDispatch(dataUser))
                })
                .catch(
                    error => console.log('messageError', error.message)
                )
        } else {
            doCreateUserWithEmailAndPassword(email, password)
                .then(function (firebaseUser: firebase.auth.UserCredential) {
                    console.log(firebaseUser)
                    doAuthStateChange((dataUser: IUserData)=>isAuthDispatch(dataUser))
                })
                .catch(
                    error => console.log('messageError', error.message)
                )
        }

    }
}

export function isAuthenticatedActionCreator(token: string|null) {
    return {
        type: IS_AUTHENTICATED,
        payload: token
    }
}