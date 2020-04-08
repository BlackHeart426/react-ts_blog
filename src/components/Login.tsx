import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {DialogLogin} from "./Dialog/DialogAuth/DialogLogin";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

interface IDataUser {
    email: string,
    password: string
}

const Login = (props: any) => {
    const [dialogOpened, setDialogOpened] = useState(false);
    const [state, setState] = useState(null)

    const handleOpenLogin = () => {
        setDialogOpened(true)

    };
    const handleLogin = (dataUser: IDataUser) => {
        console.log(dataUser.email)
        const email = "val007@gmail.com"
        const password = "123123"
        doCreateUserWithEmailAndPassword(dataUser.email, dataUser.password)
            .then(
                //dispatch
            )
            .catch(error => {
                console.log(error)
            });
    };

    return(
        <>
            <Button
                onClick={handleOpenLogin}
                type="submit"
                color="primary"
                variant="contained"
            >
                Login
            </Button>
            <DialogLogin
                show={ dialogOpened }
                onLogin = {(dataUser: any) => handleLogin(dataUser)}
                onHide={ () => setDialogOpened(false) }
            />
        </>
    )
};

// function mapStateToProps(state: any) {
//     return {
//         counter: state.counter
//     }
//
// }
//
// function mapDispatchToProps(dispatch: any) {
//     return {
//         auth: (email: string, password: string, isLogin) => dispatch(auth(email, password, isLogin)),
//         alert: (text) => dispatch(showAlert(text)),
//     }
// }

export default Login //connect(mapStateToProps, mapDispatchToProps)(Login)