import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {DialogLogin} from "./Dialog/DialogAuth/DialogLogin";
import {doSignInWithEmailAndPassword} from "../firebase/auth";
import {authorizationActionCreator} from "../store/action/authorization";

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
        props.authorization(dataUser.email, dataUser.password)
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

function mapStateToProps(state: any) {
    return {
        counter: state.counter
    }

}

function mapDispatchToProps(dispatch: any) {
    return {
        authorization: (email: string, password: string, isLogin: boolean) => dispatch(isAuthorizationActionCreator(email, password, true)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)