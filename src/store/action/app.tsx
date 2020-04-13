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

// export const authorizationGoogleActionCreator = () => {
//     return async (dispatch: any) => {
//         doGoogleSignIn()
//             .then(result => {
//                 doAuthStateChange((dataUser: IUserData)=>{
//                     dispatch(isAuthenticatedActionCreator(dataUser.token))
//                 })
//                 console.log(result)
//             })
//             .catch(error => {
//                 console.log(error)
//             })
//     }
// }