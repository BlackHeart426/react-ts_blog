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

export function AuthorizationLogin(props: any) {
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
    }

    // const classes = useStyles();
    // const {show, onHide, onLogin, onAuthGoogle} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorForm, setError] = useState(initialState);

    const handleLogin = () => {
        const dataUser = {
            email,
            password
        }
        // onLogin(dataUser)
        // handleClose()
    };

    const handleGoogle = () => {
        // onAuthGoogle()
        // handleClose()
    };

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
                    Login
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