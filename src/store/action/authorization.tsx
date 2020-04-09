import {IS_AUTHENTICATION} from "../types";
import {doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword} from "../../firebase/auth";
import { auth } from "../../firebase/firebaseService";
import { Dispatch } from "redux";
import { User } from "firebase";

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
                    doAuthStateChange()
                })
                .catch(
                    error => console.log('messageError', error.message)
                )
        } else {
            doCreateUserWithEmailAndPassword(email, password)
                .then(function (firebaseUser) {
                    console.log(firebaseUser)
                    doAuthStateChange()
                })
                .catch(
                    error => console.log('messageError', error.message)
                )
        }
        const doAuthStateChange = async () => {
            auth.onAuthStateChanged(function (user: User | null) {
                if (user) {
                    console.log(user)
                    const uid = user.uid
                    const email = user.email;
                    const expiresIn:any = user.metadata.lastSignInTime;
                    const token = user.getIdToken().then(
                        function (token) {
                            const lastSignInTime = new Date(expiresIn);
                            const expirationDate = new Date(lastSignInTime.setHours(lastSignInTime.getHours() + 3))

                            localStorage.setItem('token', token)
                            localStorage.setItem('userId', uid)
                            localStorage.setItem('expirationDate', expirationDate.toString())
                            localStorage.setItem('email', "" + email)

                            // dispatch(authSuccess(token))
                            // dispatch(autoLogout(expirationDate))
                        }
                    );
                }

            })
        }
    }
}