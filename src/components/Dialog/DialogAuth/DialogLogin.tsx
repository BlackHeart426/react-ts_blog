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

    const classes = useStyles();
    const {show, onHide, onLogin} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dialogOpened, setDialogOpened] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);

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
        // if (username === 'abc@email.com' && password === 'password') {
        //     //Запрос в БД
        //     setError(false);
        //     setHelperText('Login Successfully');
        // } else {
        //     setError(true);
        //     setHelperText('Incorrect username or password')
        // }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleLogin();
        }
    };


    const handleClose = (e: any) => {
        onHide()
        setDialogOpened(false)
    };

    const handleChange = (e: any) => {
        const {name, value} = e.currentTarget;
        // const filedName = e.currentTarget.dataset.filedName

        console.log(value, name)
    }

    const data = {
        title: 'LOGIN',
        content:
            <div>
                <TextField
                    error={error}
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
                    error={error}
                    variant="outlined"
                    fullWidth
                    name="password"
                    id="password"
                    type="password"
                    label="Password"
                    placeholder="Password"
                    margin="normal"
                    helperText={helperText}
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