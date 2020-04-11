import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {validateForm} from "../../components/validateForm/validateForm";
import {Checkbox, Typography, FormControlLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {authorizationActionCreator, authorizationGoogleActionCreator} from "../../store/action/authorization";
import {connect} from "react-redux";

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

function AuthorizationLogin(props: any) {
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
    }

    const [email, setEmail] = useState('valepa009@gmail.com');
    const [password, setPassword] = useState('qwe123QWE!@#');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorForm, setError] = useState(initialState);

    const handleLogin = () => {
        props.action.authorization(email, password)
        handleClose()
    };

    const handleClose = () => {
        onHideModal()
        setDialogOpened(false)
    };

    useEffect(() => {
        if (errorForm.email.status === false
            && errorForm.password.status === false
            && email.trim() && password.trim()) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, password]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleLogin();
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
                    <strong>Login</strong>
                </Typography>
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
                <FormControlLabel
                    control={
                        <Checkbox
                            // checked={state.checkedB}
                            onChange={handleChange}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Remember me"
                />
                <FormControl fullWidth  className={classes.action}>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        // className={classes.loginBtn}
                        onClick={handleLogin}
                        disabled={isButtonDisabled}>
                        LOGIN
                    </Button>
                </FormControl>
                <Grid container >
                    <Grid item xs >
                        <Link href="#" onClick={() => onChangeForm('recovery')} variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" onClick={() => onChangeForm('signUp')} variant="body2">
                            {"Don't have an account? Sign Up"}
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
            authorization: (email: string, password: string) => dispatch(authorizationActionCreator(email, password, true)),
        }
    }
}

export default connect(null, mapDispatchToProps)(AuthorizationLogin)