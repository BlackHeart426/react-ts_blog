import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {validateForm} from "../../components/validateForm/validateForm";
import {Checkbox, Typography, FormControlLabel, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {authorizationActionCreator} from "../../store/action/authorization";
import {connect} from "react-redux";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {Visibility, VisibilityOff} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            action: {
                marginTop: '10px',
            },
            contentText: {
                marginTop: '8px'
            }

        }
    )
)

function AuthorizationSignUp(props: any) {
    const classes = useStyles()
    const {onChangeForm, onHideModal} = props;

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

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorForm, setError] = useState(initialState);

    // useEffect(()=>{
    //     debugger
    //     if(password === passwordRepeat) {
    //         setError({...errorForm, passwordRepeat: {status: false, message: ''}});
    //     } else {
    //         setError({...errorForm, passwordRepeat: {status: true, message: 'Password do not match'}});
    //     }
    // },[passwordRepeat, password])

    useEffect(() => {
        let passwordError;
        if(password === passwordRepeat) {
            setError({...errorForm, passwordRepeat: {status: false, message: ''}});
            passwordError = false
        } else {
            setError({...errorForm, passwordRepeat: {status: true, message: 'Password do not match'}});
            passwordError = true
        }
        if (!errorForm.email.status
            && !errorForm.password.status
            && !passwordError
            && !errorForm.username.status
            && !errorForm.email.status
            && username.trim()
            && email.trim()
            && password.trim()
            && passwordRepeat.trim()) {
            console.log(errorForm, username, email, password, passwordRepeat)
            setIsButtonDisabled(false);
        } else {
            console.log(errorForm, username, email, password, passwordRepeat)
            setIsButtonDisabled(true);
        }
    }, [username, password, email, passwordRepeat]);

    const handleSignUp = () => {
        props.action.authorization(email, password)
        handleClose()
    };

    const handleClose = () => {
        onHideModal()
        setDialogOpened(false)
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleSignUp();
        }
    };

    const handleClickShowPassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e: any, cb: any) => {
        const {name, value} = e.currentTarget;
        const infoValid = validateForm(name, value)
        setError({...errorForm, [name]: {status: infoValid.error, message: infoValid.errorMessage}});
        return cb
    }
    return (
        <>
            <div>
                <Typography align={"center"}>
                    <strong>Sign Up</strong>
                </Typography>
                <TextField
                    className={classes.contentText}
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
                    className={classes.contentText}
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
                    className={classes.contentText}
                    error={errorForm.password.status}
                    helperText={errorForm.password.message}
                    fullWidth
                    variant="outlined"
                    id="password"
                    type={passwordVisible ? 'text' : 'password'}
                    name="password"
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                size={"small"}
                                edge="end"
                            >
                                {passwordVisible ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>,
                    }}
                    size={"small"}
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                    onChange={(e) => handleChange(e, setPassword(e.target.value))}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
                <TextField
                    className={classes.contentText}
                    style={{marginTop: '8px'}}
                    error={errorForm.passwordRepeat.status}
                    helperText={errorForm.passwordRepeat.message}
                    fullWidth
                    size={"small"}
                    variant="outlined"
                    id="passwordRepeat"
                    type={passwordVisible ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                size={"small"}
                                edge="end"
                            >
                                {passwordVisible ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>,
                    }}
                    name="passwordRepeat"
                    label="Password Repeat"
                    placeholder="Repeat Password"
                    margin="normal"
                    onChange={(e) => setPasswordRepeat(e.target.value)}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
                <FormControl fullWidth className={classes.action}>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        // className={classes.signUpBtn}
                        onClick={handleSignUp}
                        disabled={isButtonDisabled}>
                        Sign Up
                    </Button>
                </FormControl>
                <Grid container >
                    <Grid item xs >
                        <Link href="#" onClick={() => onChangeForm('recovery')} variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" onClick={() => onChangeForm('login')} variant="body2">
                            {"Don't have an account? Login"}
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}


function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            authorization: (email: string, password: string) => dispatch(authorizationActionCreator(email, password, false)),
        }
    }
}

export default connect(null, mapDispatchToProps)(AuthorizationSignUp)