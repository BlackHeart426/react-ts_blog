import {IS_AUTHENTICATED, SET_DATA_BLOG, SET_MY_PAGE} from "../types";
import {
    doAuthStateChange,
    doCreateUserWithEmailAndPassword, doGoogleSignIn, doPasswordReset,
    doSignInWithEmailAndPassword,
    doSignOut
} from "../../firebase/auth";
import { Dispatch } from "redux";
import firebase from "firebase";
import {TOKEN, USERID, EXPIRATIONDATE, EMAIL} from "../../constants/localStorage";
import { getDataPageBlogFireBase } from "../../firebase/database";

export const getDataBlogActionCreator = (nameBlog: string) => {
    return async (dispatch: any) => {
        getDataPageBlogFireBase(nameBlog)
            .then((snapshot: any) => {
                const dataBlog = snapshot.val()
                dispatch({ type: SET_DATA_BLOG, payload: dataBlog });
                console.log('response', dataBlog)
            })
            .catch(error => {
                console.error('error',error)
            })
    }
}