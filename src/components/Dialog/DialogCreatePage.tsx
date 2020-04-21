import React, {useEffect, useState} from "react";
import {AuthorizationForm} from "../../container/Authorization/AuthorizationForm";
import {CustomDialog} from "./CustomDialog";
import {CardContent, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {authorizationActionCreator} from "../../store/action/authorization";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";

function DialogCreatePage(props: any) {
    const {show, onHide} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    const [email, setEmail] = useState('');
    const [pageBlog, setPageBlog] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(()=>{
        setDialogOpened(show)
    },[show])

    useEffect(() => {
        if (email.trim() && pageBlog.trim()){
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [email, pageBlog]);

    const handleBecomeAuthor = () => {
        props.action.setMyPage(pageBlog)
        onHide()

    }

    const data = {
        title: 'Become an author',
        content:
            <div>
                <Typography variant="body2" color="textSecondary" component="p">
                    Get ongoing support from your audience. Do it, and we will take care of the rest.
                </Typography>
                <TextField
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
                    onChange={(e) => setEmail(e.target.value)}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    id="pageBlog"
                    autoFocus
                    name="pageBlog"
                    size={"small"}
                    label="Blog Page "
                    placeholder="Blog Page "
                    margin="normal"
                    onChange={(e) => setPageBlog(e.target.value)}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
            </div>,
        action:
            <FormControl fullWidth >
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    // className={classes.loginBtn}
                    onClick={handleBecomeAuthor}
                    disabled={isButtonDisabled}>
                    Become Author
                </Button>
            </FormControl>
    }

    return (
        <CustomDialog size={'xs'} data={ data } show={ dialogOpened }  onHide={ onHide }/>
    )
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            setMyPage: (name: string) => dispatch(createPageActionCreator(name)),
        }
    }
}

export default connect(null, mapDispatchToProps)(DialogCreatePage)