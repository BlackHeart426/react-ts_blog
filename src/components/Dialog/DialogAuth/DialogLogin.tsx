import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import CustomDialog from "../CustomDialog";
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

const useStyles = makeStyles((theme) =>
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

export function DialogLogin(props: any) {

    const initialState = {
        email: '',
        password: '',
        formErrors: {email: '', password: ''},
        emailValid: false,
        passwordValid: false,
        formValid: false
    }

    const classes = useStyles();
    const {show, onHide, onLogin} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [errorForm, setError] = useState({email: false, password: false, emailError: '', passwordError: ''});

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

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleLogin();
        }
    };


    const handleClose = () => {
        onHide()
        setDialogOpened(false)
    };

    const handleChange = (e: any) => {
        const {name, value} = e.currentTarget;
        if (name === 'email'){
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                setError({...errorForm, email: true, emailError: 'Incorrect email address'});
            } else {
                setError({...errorForm, email: false, emailError: ''});
            }
            setEmail(value)
        } else {
            console.log(12)
            if (!/^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$/.test(value)) {
                setError({...errorForm, password: true, passwordError: 'Not strong password'});
            } else {
                setError({...errorForm, password: false, passwordError: ''});
            }
            setPassword(value)
        }
    }

    const data = {
        title: 'LOGIN',
        content:
            <div>
                <TextField
                    error={errorForm.email}
                    helperText={errorForm.emailError}
                    variant="outlined"
                    fullWidth
                    id="email"
                    autoFocus
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="Email"
                    margin="normal"
                    onChange={handleChange}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
                <TextField
                    error={errorForm.password}
                    helperText={errorForm.passwordError}
                    variant="outlined"
                    fullWidth
                    name="password"
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                    onChange={handleChange}
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