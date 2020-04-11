import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import {validateForm} from "../../components/validateForm/validateForm";
import {Checkbox, Typography, FormControlLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

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

export function AuthorizationSignUp(props: any) {
    const classes = useStyles()
    const {onChangeForm} = props;

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
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorForm, setError] = useState(initialState);

    const handleSignUp = () => {
        // const dataUser = {
        //     username,
        //     email,
        //     password,
        //     passwordRepeat
        // }
        // onSignUp(dataUser)
        // handleClose()
    };


    const handlePasswordRepeat = (e: any,cb: any) => {
        if(password !== e.target.value) {
            setError({...errorForm, passwordRepeat: {status: true, message: 'Password do not match'}});
        } else {
            setError({...errorForm, passwordRepeat: {status: false, message: ''}});
        }

        return cb
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleSignUp();
        }
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
                    Sign Up
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
                    className={classes.contentText}
                    style={{marginTop: '8px'}}
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