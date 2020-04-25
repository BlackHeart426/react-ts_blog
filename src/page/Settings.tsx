import React, {useEffect, useState} from "react";
import {
    Button,
    CardActions,
    CardContent,
    CardMedia, CircularProgress,
    FormControl,
    Grid,
    IconButton,
    makeStyles, Paper,
    Theme
} from "@material-ui/core";
import {createStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import {validateForm} from "../components/validateForm/validateForm";
import EditIcon from '@material-ui/icons/Edit';
import {onComplete, updateBackgroundUser} from "../firebase/storage";
import {getDataBlogActionCreator, updateDataBlogActionCreator} from "../store/action/blog";
import {connect} from "react-redux";
import {grey, green} from "@material-ui/core/colors";
import {Card} from "semantic-ui-react";
import {updateUserDataActionCreator} from "../store/action/currentUser";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                },
                display: 'flex',
                alignItems: 'center',
            },
            textField: {
                marginTop: 5
            },
            content: {
                marginTop: 40
            },
            contentAvatar: {
                width: '225px',
            },
            wrapper: {
                position: 'relative',
            },
            input: {
                display: 'none',
            },
            buttonProgress: {
                color: '#f15f2c',
                position: 'absolute',
                top: '40%',
                left: '35%',
                marginTop: -12,
                marginLeft: -12,
            },
        }
    )
)

const initialState = {
    email: {
        status: false,
        message: ''
    },
}

function SettingsComponents (props: any){
    const classes = useStyles()
    const [errorForm, setError] = useState(initialState);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [isDisabled, setIsDisabled] = useState(true)
    const [loading, setLoading] = React.useState(false);

    const handleValidate = (e: any, cb: any) => {
        const {name, value} = e.currentTarget;
        const infoValid = validateForm(name, value)
        setError({...errorForm, [name]: {status: infoValid.error, message: infoValid.errorMessage}});
        return cb
    }

    const handleEditEmail = () => {
        setIsDisabled(false)
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.keyCode === 13 || e.which === 13) {
            // handleSendEmail();
            if(!errorForm.email.status && email.trim() ) {
                console.log(e)
            }

        }
    };

    const handleChange = (event: any) => {
        const image = event.target.files[0];
        handleUpload(image)
    }
    useEffect(()=>{
        console.log(props.dataBlog)
    },[])

    const handleUpload = (image: string) =>  {
        if(!loading){
            props.action.updateUserDataBlog('Avatar', '')
            setLoading(true);
            updateBackgroundUser(image)
                .on('state_changed',
                    (snapshot: any) => {
                    },
                    (error: Error) => {
                    },
                    () => {

                        // complete function ....
                        onComplete(image, props.action.updateDataBlog, props.action.updateUserDataBlog, 'Avatar')
                            .then(response => {
                                console.log(response)
                                setLoading(false)
                            })
                            .catch(error => {

                            })
                    });
        }

    }

    return <div className={classes.content}>
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <div>
                    <Typography variant="inherit">Name</Typography>
                    <TextField
                        variant="outlined"
                        fullWidth
                        id="name"
                        name="name"
                        className={classes.textField}
                        type="text"
                        size={"small"}
                        placeholder="Name"
                        value={name}
                        margin="normal"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Typography variant="body2" color="textSecondary" component="p" >
                        The name will be shown on your pages
                    </Typography>
                </div>
                <div style={{marginTop: 30}}>
                    <Typography variant="inherit" >
                        E-mail
                    </Typography>
                    <TextField
                        error={errorForm.email.status}
                        helperText={errorForm.email.message}
                        variant="outlined"
                        fullWidth
                        value={email}
                        id="email"
                        className={classes.textField}
                        name="email"
                        type="email"
                        disabled={isDisabled}
                        InputProps={{
                            endAdornment:  <IconButton aria-label="delete" onClick={handleEditEmail} size={"small"}>
                                <EditIcon color={"primary"}/>
                            </IconButton>,
                        }}
                        size={"small"}
                        placeholder="Email"
                        margin="normal"
                        onChange={(e) => handleValidate(e, setEmail(e.target.value))}
                        onKeyPress={(e)=>handleKeyPress(e)}
                    />
                    <Typography variant="body2" color="textSecondary" component="p" >
                        Mail is required for the full functionality of your account
                    </Typography>
                </div>
                <div style={{marginTop: 30}}>
                    <Typography variant="inherit" >
                        Change avatar
                    </Typography>
                    <div className={classes.root}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            onChange={handleChange}
                            type="file"
                        />

                        <label htmlFor="contained-button-file" style={{margin: 0, marginTop: 5, marginBottom: 5}}>
                            <div className={classes.wrapper}>
                                <Button
                                    disableElevation
                                    component="span"
                                    variant="outlined"
                                >
                                    <strong>Select image</strong>
                                </Button>
                            </div>
                        </label>
                    </div>
                    <Typography variant="body2" color="textSecondary" component="p" >
                        PNG, JPG size 225x280, till 10 мб.
                    </Typography>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div>
                    <div>
                        <Typography variant="inherit" >
                            Avatar profile
                        </Typography>
                    </div>
                    <div>
                        <Paper elevation={0} className={classes.contentAvatar}>
                            {!props.userAvatar
                                ? <Card
                                    style={{background: grey[100], height: 280, position: 'relative'}}
                                ><CircularProgress size={85} className={classes.buttonProgress} />
                            </Card>
                                : <CardMedia
                                    component="img"
                                    height="280"
                                    style={{background: grey[100]}}
                                    image={props.userAvatar}
                                    title="Contemplative Reptile"
                                />
                            }

                        </Paper>
                    </div>
                </div>
            </Grid>
        </Grid>
    </div>
}

function mapStateToProps(state: any) {
    return {
        userAvatar: state.currentUser.Avatar
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            updateDataBlog: (nameColumn: string, value: any) => dispatch(updateDataBlogActionCreator(nameColumn, value)),
            updateUserDataBlog: (nameColumn: string, value: any) => dispatch(updateUserDataActionCreator(nameColumn, value)),
            getDataBlog: (userId: string) => dispatch(getDataBlogActionCreator(userId)),

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponents);

