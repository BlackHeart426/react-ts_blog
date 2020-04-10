import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {CustomDialog} from "../CustomDialog";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/styles/createStyles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Card from "@material-ui/core/Card";
import Dialog from "@material-ui/core/Dialog";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {Theme} from "@material-ui/core";
import {validateForm} from "../../validateForm/validateForm";
import {Icon} from "@iconify/react";
import googleIcon from "@iconify/icons-flat-color-icons/google";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
        },
        loginBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        signUpBtn: {
            marginTop: theme.spacing(2),
            flexGrow: 1
        },
        header: {
            textAlign: 'center',
            background: '#3f51b5',
            color: '#fff'
        },
        actionGrid: {
            marginTop: theme.spacing(1)
        }

    }),
);
export function DialogRecoveryPassword(props: any) {

    const initialState = {
        email: {
            status: false,
            message: ''
        },
        password: {
            status: false,
            message: ''
        },
        passwordRepeat: {
            status: false,
            message: ''
        },
        username: {
            status: false,
            message: ''
        },
    }

    const classes = useStyles();
    const {show, onHide, onSignUp, onAuthGoogle} = props;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorForm, setError] = useState(initialState);

    useEffect(() => {
        if (username.trim() && email.trim() && password.trim() && passwordRepeat.trim() && ( password === passwordRepeat)) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [username, password, email, passwordRepeat]);

    useEffect(() => {
        setDialogOpened(show)
    }, [show]);

    const handleSignUp = () => {
        const dataUser = {
            username,
            email,
            password,
            passwordRepeat
        }
        onSignUp(dataUser)
        handleClose()
    };

    const handleGoogle = () => {
        onAuthGoogle()
        handleClose()
    };

    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleSignUp();
        }
    };

    const handleClose = () => {
        onHide()
        setDialogOpened(false)
    };

    const handlePasswordRepeat = (e: any,cb: any) => {
        debugger
        if(password !== e.target.value) {
            setError({...errorForm, passwordRepeat: {status: true, message: 'Password do not match'}});
        } else {
            setError({...errorForm, passwordRepeat: {status: false, message: ''}});
        }

        return cb
    };

    const handleChange = (e: any, cb: any) => {
        const {name, value} = e.currentTarget;
        const infoValid = validateForm(name, value)
        setError({...errorForm, [name]: {status: infoValid.error, message: infoValid.errorMessage}});

        return cb
    }

    const data = {
        title: 'SIGN UP',
        content:
            <div>
                <TextField
                    error={errorForm.username.status}
                    helperText={errorForm.username.message}
                    fullWidth
                    variant="outlined"
                    id="username"
                    type="text"
                    size={"small"}
                    name="username"
                    label="Username"
                    placeholder="Username"
                    margin="normal"
                    onChange={(e) => handleChange(e, setUsername(e.target.value))}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
                <TextField
                    error={errorForm.email.status}
                    helperText={errorForm.email.message}
                    fullWidth
                    variant="outlined"
                    id="email"
                    type="email"
                    name="email"
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
                    fullWidth
                    variant="outlined"
                    id="password"
                    type="password"
                    name="password"
                    size={"small"}
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                    onChange={(e) => handleChange(e, setPassword(e.target.value))}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
                <TextField
                    error={errorForm.passwordRepeat.status}
                    helperText={errorForm.passwordRepeat.message}
                    fullWidth
                    size={"small"}
                    variant="outlined"
                    id="passwordRepeat"
                    type="password"
                    name="passwordRepeat"
                    label="Password Repeat"
                    placeholder="Repeat Password"
                    margin="normal"
                    onChange={(e) => handlePasswordRepeat(e,setPasswordRepeat(e.target.value))}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
            </div>,
        action:
            <FormControl fullWidth >
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    className={classes.signUpBtn}
                    onClick={handleSignUp}
                    disabled={isButtonDisabled}>
                    Sign Up
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<Icon icon={googleIcon}/>}
                    className={classes.loginBtn}
                    onClick={handleGoogle}>
                    GOOGLE
                </Button>
                {/*<Grid container>*/}
                {/*    <Grid item xs>*/}
                {/*        <Link href="#" variant="body2">*/}
                {/*            Forgot password?*/}
                {/*        </Link>*/}
                {/*    </Grid>*/}
                {/*    <Grid item>*/}
                {/*        <Link href="#" variant="body2">*/}
                {/*            {"Have an account? Login"}*/}
                {/*        </Link>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
            </FormControl>

    }

    return (
        <CustomDialog  data = { data } show={ dialogOpened }  onHide={ onHide }/>
    );

}