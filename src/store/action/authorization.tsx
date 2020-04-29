import {IS_AUTHENTICATED} from "../types";
import {
    doAuthStateChange,
    doCreateUserWithEmailAndPassword, doGoogleSignIn, doPasswordReset,
    doSignInWithEmailAndPassword,
    doSignOut,
    doVkSignIn
} from "../../firebase/auth";
import { Dispatch } from "redux";
import firebase from "firebase";
import {TOKEN, USERID, EXPIRATIONDATE, EMAIL} from "../../constants/localStorage";
import {getBlogPageUserActionCreator, userId, createPageActionCreator, getDataPageBlogActionCreator, createUserActionCreator} from "./currentUser";
import cookie from "react-cookies";
import {createUserFireBase} from "../../firebase/database";
import { getDataBlogActionCreator } from "./blog";

interface IUserData {
    token: string,
    expirationDate: string,
    userId: string
}

export const authorizationGoogleActionCreator = () => {
    let userId: any = null;
    let flagUserExist = false;
    return async (dispatch: any) => {
        await doGoogleSignIn()
            .then(result => {
                doAuthStateChange(async (dataUser: IUserData) => {
                    userId = dataUser.userId
                    await dispatch(isAuthenticatedActionCreator(dataUser.token, dataUser.userId))
                    await dispatch(getDataPageBlogActionCreator(dataUser.userId))

                    // await dispatch(getBlogPageUserActionCreator())
                })
            })
            .catch(error => {
                console.log(error)
            })

    }
}

export const authorizationVkActionCreator = () => {
    return async (dispatch: any) => {
        doVkSignIn()
        // .then(result => {
        //     doAuthStateChange((dataUser: IUserData)=>{
        //         dispatch(isAuthenticatedActionCreator(dataUser.token))
        //     })
        //     console.log(result)
        // })
        // .catch(error => {
        //     console.log(error)
        // })
    }
}

export const autoLoginActionCreator = () => {
    return async (dispatch: any) => {
        const token: string|null = localStorage.getItem(TOKEN)
        const userId: string|null = localStorage.getItem('userId');
        if(!token && !userId) {
            dispatch(logoutActionCreator())
        } else {
            await dispatch(isAuthenticatedActionCreator(token, userId))
            // dispatch(getBlogPageUserActionCreator())
        }
    }
}

export const logoutActionCreator = () => {
    return async (dispatch: any) => {
        doSignOut()
            .catch(
                error => console.log('messageError', error.message)
            )
        dispatch(isAuthenticatedActionCreator(null))
        localStorage.removeItem(TOKEN)
        localStorage.removeItem(USERID)
        localStorage.removeItem(EXPIRATIONDATE)
        localStorage.removeItem(EMAIL)
        cookie.remove('myPage',{path: '/'})
    }
}

export const authorizationActionCreator = (email: string, password: string, isLogin: boolean) => {
    return async (dispatch: any) => {
        if (isLogin) {
            doSignInWithEmailAndPassword(email, password)
                .then(function (firebaseUser: firebase.auth.UserCredential) {

                    doAuthStateChange((dataUser: IUserData)=>{
                        dispatch(isAuthenticatedActionCreator(dataUser.token, dataUser.userId))
                        // dispatch(getBlogPageUserActionCreator(dataUser.userId))
                    })
                })
                .catch(
                    error => console.log('messageError', error.message)
                )
        } else {
            doCreateUserWithEmailAndPassword(email, password)
                .then(function (firebaseUser: firebase.auth.UserCredential) {

                    doAuthStateChange((dataUser: IUserData)=>{
                        dispatch(isAuthenticatedActionCreator(dataUser.token, dataUser.userId))
                        // dispatch(getBlogPageUserActionCreator())
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
                }
            )
            .catch(error => {
                console.log(error)
            })

    }
}

export function isAuthenticatedActionCreator(token: string|null, userId: string|null = null) {
    return async (dispatch: any) => {
        await dispatch({type: IS_AUTHENTICATED, payload: token})
        await dispatch(getBlogPageUserActionCreator(userId))
        // await dispatch(getDataBlogActionCreator())
    }
}