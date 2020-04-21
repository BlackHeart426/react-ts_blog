import React, {useEffect, useState} from "react";
import {CustomDialog} from "./CustomDialog";
import {CardContent, Typography, Select, MenuItem, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";
import {grey} from "@material-ui/core/colors";

function DialogEditTask(props: any) {
    const {show, onHide} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(()=>{
        setDialogOpened(show)
    },[show])

    useEffect(() => {
        if (name.trim() && cost.trim() && description.trim()){
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [name, cost, description]);

    const handleSave = () => {
        onHide()

    }

    const data = {
        title: 'Edit Subscription Tier',
        content:
            <div>
                <Typography variant="body2"  component="p">
                    <strong>I want</strong>
                </Typography>
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    id="name"
                    name="name"
                    type="text"
                    size={"small"}
                    margin="normal"
                    onChange={(e) => setName(e.target.value)}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography variant="body2"  component="p">
                    <strong>Goal description</strong>
                </Typography>
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    multiline
                    rows={8}
                    inputProps={{
                        maxLength: 150,
                    }}
                    id="description"
                    name="Description"
                    type="text"
                    margin="normal"
                    onChange={(e) => setDescription(e.target.value)}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography color="textSecondary" variant="body2"  component="p" align={"right"}>
                    {description.length} / 150
                </Typography>
            </div>,
        action:
            <>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    // className={classes.loginBtn}
                    onClick={handleSave}
                    disabled={isButtonDisabled}>
                    save
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    color="primary"
                    // className={classes.loginBtn}
                    onClick={handleSave}>
                    remove task
                </Button>
            </>
    }

    return (
        <CustomDialog size={'sm'} data={ data } show={ dialogOpened }  onHide={ onHide }/>
    )
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            setMyPage: (name: string) => dispatch(createPageActionCreator(name)),
        }
    }
}

export default connect(null, mapDispatchToProps)(DialogEditTask)