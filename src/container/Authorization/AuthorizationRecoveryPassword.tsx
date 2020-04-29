import React, {useEffect, useState} from "react";
import TextField from "@material-ui/core/TextField";
import {validateForm} from "../../components/validateForm/validateForm";
import {Checkbox, Typography, FormControlLabel} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {authorizationActionCreator, resetPasswordActionCreator} from "../../store/action/authorization";
import {connect} from "react-redux";
import Alert from '@material-ui/lab/Alert';

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

function AuthorizationRecoveryPassword(props: any) {
    const {onChangeForm, onHideModal} = props;
    const classes = useStyles()

    const initialState = {
        email: {
            status: false,
            message: ''
        },
    }

    const [email, setEmail] = useState('');
    const [alertSuccess, setAlertSuccess] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [errorForm, setError] = useState(initialState);

    const handleSendEmail = () => {
        const dataUser = {
            email
        }
        props.action.resetPassword(email)
        setAlertSuccess(true)
    };


    const handleClose = () => {
        onHideModal()
    };

    useEffect(() => {
        if (errorForm.email.status === false
            && email.trim()){
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email]);

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13 || e.which === 13) {
            isButtonDisabled || handleSendEmail();
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
                {alertSuccess
                && <Alert onClose={() => {}}>На вашу почту отправлено письмо для восстановления пароля</Alert>
                }
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
                        onClick={handleSendEmail}
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


function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            resetPassword: (email: string) => dispatch(resetPasswordActionCreator(email)),
        }
    }
}

export default connect(null, mapDispatchToProps)(AuthorizationRecoveryPassword)