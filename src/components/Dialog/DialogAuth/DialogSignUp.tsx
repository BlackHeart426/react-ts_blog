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
import {Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
            width: 400,
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
export function DialogSignUp(props: any) {

    const classes = useStyles();
    const {show, onHide, onSignUp} = props;
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);

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

    const handleKeyPress = (e: any) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleSignUp();
        }
    };

    const handleClose = () => {
        onHide()
        setDialogOpened(false)
    };

    const data = {
        title: 'SIGN UP',
        content:
            <div>
                <TextField
                    error={error}
                    fullWidth
                    id="username"
                    type="text"
                    name="username"
                    label="Username"
                    placeholder="Username"
                    margin="normal"
                    onChange={(e)=>setUsername(e.target.value)}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
                <TextField
                    error={error}
                    fullWidth
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    placeholder="Email"
                    margin="normal"
                    onChange={(e)=>setEmail(e.target.value)}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
                <TextField
                    error={error}
                    fullWidth
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                    helperText={helperText}
                    onChange={(e)=>setPassword(e.target.value)}
                    onKeyPress={(e)=>handleKeyPress(e)}
                />
                <TextField
                    error={error}
                    fullWidth
                    id="passwordRepeat"
                    type="password"
                    name="passwordRepeat"
                    label="Password Repeat"
                    placeholder="Repeat Password"
                    margin="normal"
                    helperText={helperText}
                    onChange={(e)=>setPasswordRepeat(e.target.value)}
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
                <Grid container>
                    <Grid item xs>
                        <Link href="#" variant="body2">
                            Forgot password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            {"Have an account? Login"}
                        </Link>
                    </Grid>
                </Grid>
            </FormControl>

    }

    return (
        <CustomDialog  data = { data } show={ dialogOpened }  onHide={ onHide }/>
    );

}