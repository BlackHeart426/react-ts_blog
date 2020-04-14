import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {doSignInWithEmailAndPassword} from "../firebase/auth";
import {authorizationActionCreator, authorizationGoogleActionCreator} from "../store/action/authorization";

interface IDataUser {
    email: string,
    password: string
}

const Login: React.FC = (props: any) => {
    const [dialogOpened, setDialogOpened] = useState(false);
    const [state, setState] = useState(null)

    const handleOpenLogin = () => {
        setDialogOpened(true)

    };
    const handleLogin = (dataUser: IDataUser) => {
        console.log(dataUser.email)
        props.action.authorization(dataUser.email, dataUser.password)
    };
    const handleAuthGoogle = () => {
        props.action.authorizationGoogle()
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
            {/*<DialogLogin*/}
            {/*    show={ dialogOpened }*/}
            {/*    onAuthGoogle={handleAuthGoogle}*/}
            {/*    onLogin={(dataUser: any) => handleLogin(dataUser)}*/}
            {/*    onHide={ () => setDialogOpened(false) }*/}
            {/*/>*/}
        </>
    )
};

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            authorization: (email: string, password: string) => dispatch(authorizationActionCreator(email, password, true)),
            authorizationGoogle: () => dispatch(authorizationGoogleActionCreator())
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)