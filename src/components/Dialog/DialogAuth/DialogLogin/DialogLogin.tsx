import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {ChangeEvent, useEffect, useState} from "react";
import {CustomDialog} from "../../CustomDialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/styles/createStyles";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {validateForm} from "../../../validateForm/validateForm";
import { Icon, InlineIcon } from '@iconify/react';
import googleIcon from '@iconify/icons-flat-color-icons/google';
import {useStyles} from "./styles";

interface IValidateData {
    error: string,
    errorMessage: string
}

export function DialogLogin(props: any) {

    const initialState = {
        email: {
            status: false,
            message: ''
        },
        password: {
            status: false,
            message: ''
        },
    }

    const classes = useStyles();
    const {show, onHide, onLogin, onAuthGoogle} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorForm, setError] = useState(initialState);

    useEffect(() => {
        if (email.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, password]);

    useEffect(() => {
       setDialogOpened(show)
    }, [show]);



    const handleLogin = () => {
        const dataUser = {
            email,
            password
        }
        onLogin(dataUser)
        handleClose()
    };

    const handleGoogle = () => {
        onAuthGoogle()
        handleClose()
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleLogin();
        }
    };


    const handleClose = () => {
        onHide()
        setDialogOpened(false)
    };

    const handleChange = (e: any, cb: any) => {
        const {name, value} = e.currentTarget;
        const infoValid = validateForm(name, value)
        setError({...errorForm, [name]: {status: infoValid.error, message: infoValid.errorMessage}});
        return cb
    }

    const data = {
        title: 'LOGIN',
        content:
            <div>
                <TextField
                    error={errorForm.email.status}
                    helperText={errorForm.email.message}
                    variant="outlined"
                    fullWidth
                    id="email"
                    autoFocus
                    name="email"
                    type="email"
                    size={"small"}
                    label="Email"
                    placeholder="Email"
                    margin="normal"
                    onChange={(e) => handleChange(e, setEmail(e.target.value))}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
                <TextField
                    error={errorForm.password.status}
                    helperText={errorForm.password.message}
                    variant="outlined"
                    fullWidth
                    name="password"
                    id="password"
                    size={"small"}
                    type="password"
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                    onChange={(e) => handleChange(e, setPassword(e.target.value))}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />

            </div>,
        action:
            <FormControl fullWidth >
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.loginBtn}
                    onClick={handleLogin}
                    disabled={isButtonDisabled}>
                    LOGIN
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Icon icon={googleIcon}/>}
                    className={classes.loginBtn}
                    onClick={handleGoogle}>
                    GOOGLE
                </Button>
                <Grid container className={classes.actionGrid}>
                    <Grid item xs >
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </FormControl>


    }

    return (
        <CustomDialog  data = { data } show={ dialogOpened }  onHide={ onHide }/>
    );

}