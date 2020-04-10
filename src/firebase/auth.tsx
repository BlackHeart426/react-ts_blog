import {auth, googleAuthProvider} from "./firebaseService";
import {User} from "firebase";
import {EMAIL, EXPIRATIONDATE, TOKEN, USERID} from "../constants/localStorage";

//Google Up
export const doGoogleSignIn = () =>
    auth.signInWithPopup(googleAuthProvider)


//Sign Up
export const doCreateUserWithEmailAndPassword = (
    email: string,
    password: string
) => auth.createUserWithEmailAndPassword(email, password)

//Sing In
export const doSignInWithEmailAndPassword = (
    email: string,
    password: string
) => auth.signInWithEmailAndPassword(email, password)

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = (email: string) =>
    auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = async (password: string) => {
    if (auth.currentUser) {
        await auth.currentUser.updatePassword(password);
    }
    throw Error("No auth.currentUser!");
};
export const doAuthStateChange = async (cb: any) => {
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

                    localStorage.setItem(TOKEN, token)
                    localStorage.setItem(USERID, uid)
                    localStorage.setItem(EXPIRATIONDATE, expirationDate.toString())
                    localStorage.setItem(EMAIL, "" + email)
                    const dataUser = {
                        token,
                        expirationDate
                    }
                    return cb(dataUser)
                }
            );
        }


    })
}

