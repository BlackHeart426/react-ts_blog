import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {DialogLogin} from "./Dialog/DialogAuth/DialogLogin";

const Login = (props: any) => {
    const [dialogOpened, setDialogOpened] = useState(false);

    const handleOpenLogin = () => {
        setDialogOpened(true)

    };
    const handleLogin = (dataUser: any) => {
        console.log(dataUser.email)
        props.auth(dataUser.username, dataUser.password, true)
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

// function mapStateToProps(state) {
//     return {
//         counter: state.counter
//     }
//
// }
//
// function mapDispatchToProps(dispatch) {
//     return {
//         auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
//         alert: (text) => dispatch(showAlert(text)),
//         getAllData: () => dispatch(getAllDataActionCreator()),
//         logout: () => dispatch(logout)
//     }
// }

export default  Login //connect(mapStateToProps, mapDispatchToProps)(Login)