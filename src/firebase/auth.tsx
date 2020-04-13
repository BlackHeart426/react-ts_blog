import {auth, googleAuthProvider} from "./firebaseService";
import {User} from "firebase";
import {EMAIL, EXPIRATIONDATE, TOKEN, USERID} from "../constants/localStorage";
import fetchJsonp from "fetch-jsonp";


//Vkontakte
export const doVkSignIn = () => {

    // async function postData(url = '', data = {}) {
    //     // Default options are marked with *
    //     const response = await fetch(url, {
    //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //         mode: 'no-cors', // no-cors, *cors, same-origin
    //         cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //         credentials: 'same-origin', // include, *same-origin, omit
    //         headers: {
    //             'Content-Type': 'application/json'
    //             // 'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         redirect: 'follow', // manual, *follow, error
    //         referrerPolicy: 'no-referrer', // no-referrer, *client
    //         body: JSON.stringify(data) // body data type must match "Content-Type" header
    //     });
    //     return await response.json(); // parses JSON response into native JavaScript objects
    // }
    //
    // postData('https://oauth.vk.com/authorize?client_id=7407927&display=popup&redirect_uri=https://ts-blog-45eb9.firebaseapp.com&scope=email&response_type=code&v=5.103', { answer: 42 })
    //     .then((data) => {
    //         console.log(data); // JSON data parsed by `response.json()` call
    //     });
    // let vkCode;
    // fetch('https://oauth.vk.com/authorize?client_id=7407927&display=popup&redirect_uri=https://ts-blog-45eb9.firebaseapp.com&scope=email&response_type=code&v=5.103')
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })

    // Axios.get('https://oauth.vk.com/authorize?client_id='+process.env.REACT_VK_CLIEND_ID+'&display=popup&redirect_uri='+process.env.REACT_URL+'&scope=email&response_type=code&v=5.103')
    // Axios.get('https://oauth.vk.com/authorize?client_id=7407927&display=popup&redirect_uri=https://ts-blog-45eb9.firebaseapp.com&scope=email&response_type=token&v=5.103')
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
    // Axios.request({
    //     url: '/authorize?client_id=7407927&display=popup&redirect_uri=https://ts-blog-45eb9.firebaseapp.com&scope=email&response_type=code&v=5.103',
    //     method: "post",
    //     baseURL: 'https://oauth.vk.com',
    //
    // })


    // const uid = `vk:${vkCode}`;
    // auth.signInWithCustomToken(uid)
    //     .then(response => {
    //         console.log(response)
    //     })
    //     .catch(error => {
    //         console.log(error)
    //     })
}

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

