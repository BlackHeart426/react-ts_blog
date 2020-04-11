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

export function AuthorizationRecoveryPassword(props: any) {
    const {onChangeForm} = props;
    const classes = useStyles()

    const initialState = {
        email: {
            status: false,
            message: ''
        },
    }

    // const classes = useStyles();
    // const {show, onHide, onLogin, onAuthGoogle} = props;
    const [email, setEmail] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorForm, setError] = useState(initialState);

    const handleLogin = () => {
        const dataUser = {
            email
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
                    <strong>Recovery password</strong>
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
                <FormControl fullWidth  className={classes.action}>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        // className={classes.loginBtn}
                        onClick={handleLogin}
                        disabled={isButtonDisabled}>
                        Send
                    </Button>
                </FormControl>
                <Grid container >
                    <Grid item xs >
                        <Link href="#" onClick={() => onChangeForm('login')} variant="body2">
                            Login
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" onClick={() => onChangeForm('signUp')} variant="body2">
                            Sign Up
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}