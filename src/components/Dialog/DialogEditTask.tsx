import React, {useEffect, useState} from "react";
import {CustomDialog} from "./CustomDialog";
import {CardContent, Typography, Select, MenuItem, Paper, IconButton} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import {
    addDataBlogActionCreator,
    removeDataBlogActionCreator,
    updateArrayDataBlogActionCreator
} from "../../store/action/blog";
import {PromptButton} from "../Button/PromptButton";

const initialState = {
    name: '',
    description: '',
    task: 'money'
}

interface IState {
    name: string,
    description: string,
    task: string
}

function DialogEditTask(props: any) {
    const {show, onHide, uuid} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    const [state, setState] = useState<IState>(initialState);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(()=>{
        setDialogOpened(show)
        const data: any = Object.values(props.dataBlog).find((item: any, index) => item.uuid === uuid)
        console.log( data)
        data && setState({...state, name: data.name, task: data.task, description: data.description})
    },[show])

    useEffect(() => {
        if (state.name.trim() && state.description.trim()){
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [state.name, state.description]);

    const handleRemoveTask = () => {
        props.action.removeTier('Tasks', uuid)
        onHide()
    }

    const handleSave = () => {
        onHide()
        const dataTask = {
            uuid,
            name: state.name,
            description: state.description,
            task: state.task
        }
        props.action.updateDataBlog('Tasks', dataTask, uuid)
    }

    const data = {
        title: 'Edit Subscription Task',
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
                    value={state.name}
                    size={"small"}
                    margin="normal"
                    onChange={(e) => setState({...state, name: e.target.value})}
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
                    value={state.description}
                    rows={8}
                    inputProps={{
                        maxLength: 150,
                    }}
                    id="description"
                    name="Description"
                    type="text"
                    margin="normal"
                    onChange={(e) => setState({...state, description: e.target.value})}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography color="textSecondary" variant="body2"  component="p" align={"right"}>
                    {state.description.length} / 150
                </Typography>
            </div>,
        action:
            <>
                <Button
                    variant="contained"
                    size="large"
                    disableElevation
                    color="primary"
                    // className={classes.loginBtn}
                    onClick={handleSave}
                    disabled={isButtonDisabled}>
                    save
                </Button>
                <PromptButton name={"Remove task"} onAccept={() => handleRemoveTask()}/>
            </>
    }

    return (
        <CustomDialog size={'sm'} data={ data } show={ dialogOpened }  onHide={ onHide }/>
    )
}

function mapStateToProps(state: any) {
    return {
        dataBlog: state.blog.Tasks
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            setMyPage: (name: string) => dispatch(createPageActionCreator(name)),
            removeTier: (name: string, uuid: string) => dispatch(removeDataBlogActionCreator(name, uuid)),
            updateDataBlog: (nameColumn: string, value: any, uuid: string) => dispatch(updateArrayDataBlogActionCreator(nameColumn, value, uuid))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogEditTask)