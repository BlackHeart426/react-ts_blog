import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {DialogLogin} from "./Dialog/DialogAuth/DialogLogin";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import {DialogSignUp} from "./Dialog/DialogAuth/DialogSignUp";
import {authorizationActionCreator} from "../store/action/authorization";

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
        props.authorization(dataUser.email, dataUser.password)
        // doCreateUserWithEmailAndPassword(dataUser.email, dataUser.password)
        //     .then(
        //         //dispatch
        //     )
        //     .catch(error => {
        //         console.log(error)
        //     });
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
        authorization: (email: string, password: string) => dispatch(authorizationActionCreator(email, password, false)),
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(SignUp)