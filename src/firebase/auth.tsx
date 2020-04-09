import { auth } from "./firebaseService";

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
// export const doAuthStateChange = async () => {
//     auth.onAuthStateChanged(function(user) {
//         if (user) {
//             const uid = user.uid
//             const email = user.email;
//             const expiresIn = user.metadata.a;
//             const token = user.getIdToken().then(
//                 function(token){
//                     const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
//
//                     localStorage.setItem('token', token)
//                     localStorage.setItem('userId', uid)
//                     localStorage.setItem('expirationDate', expirationDate)
//                     localStorage.setItem('email', email)
//
//                     // dispatch(authSuccess(token))
//                     // dispatch(autoLogout(expirationDate))
//                 }
//             );
//         }
//
// }

