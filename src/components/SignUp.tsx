import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {DialogLogin} from "./Dialog/DialogAuth/DialogLogin";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import {DialogSignUp} from "./Dialog/DialogAuth/DialogSignUp";
import {authorizationActionCreator, authorizationGoogleActionCreator} from "../store/action/authorization";

interface IDataUser {
    email: string,
    password: string
}

const SignUp = (props: any) => {
    const [dialogOpened, setDialogOpened] = useState(false);
    const [state, setState] = useState(null)

    const handleOpenSignUp = () => {
        setDialogOpened(true)

    };
    const handleSignUp = (dataUser: IDataUser) => {
        console.log(dataUser.email)
        props.action.authorization(dataUser.email, dataUser.password)
    };

    const handleAuthGoogle = () => {
        props.action.authorizationGoogle()
    };

    return(
        <>
            <Button
                onClick={handleOpenSignUp}
                type="submit"
                variant="outlined"
            >
                <strong>Register</strong>
            </Button>
            <DialogSignUp
                show={ dialogOpened }
                onSignUp = {(dataUser: any) => handleSignUp(dataUser)}
                onAuthGoogle={handleAuthGoogle}
                onHide={ () => setDialogOpened(false) }
            />
        </>
    )
};

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            authorization: (email: string, password: string) => dispatch(authorizationActionCreator(email, password, false)),
            authorizationGoogle: () => dispatch(authorizationGoogleActionCreator())
        }

    }
}

export default  connect(null, mapDispatchToProps)(SignUp)