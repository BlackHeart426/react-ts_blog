import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {doSignInWithEmailAndPassword} from "../firebase/auth";
import {authorizationActionCreator, authorizationGoogleActionCreator} from "../store/action/authorization";

interface IDataUser {
    email: string,
    password: string
}

const RecoveryPassword = (props: any) => {
    const [dialogOpened, setDialogOpened] = useState(false);
    const [state, setState] = useState(null)

    const handleOpenRecoveryPassword = () => {
        setDialogOpened(true)

    };
    const handleRecoveryPassword = (dataUser: IDataUser) => {
        // props.action.authorization(dataUser.email, dataUser.password)
    };

    return(
        <>
            <Button
                onClick={handleOpenRecoveryPassword}
                type="submit"
                color="primary"
                variant="contained"
            >
                Login
            </Button>
            {/*<DialogRecoveryPassword*/}
            {/*    show={ dialogOpened }*/}
            {/*    onLogin={(dataUser: any) => handleRecoveryPassword(dataUser)}*/}
            {/*    onHide={ () => setDialogOpened(false) }*/}
            {/*/>*/}
        </>
    )
};

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            // authorization: (email: string, password: string) => dispatch(authorizationActionCreator(email, password, true)),
        }
    }
}

export default connect(null, mapDispatchToProps)(RecoveryPassword)