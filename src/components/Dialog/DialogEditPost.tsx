import React, {useEffect, useState} from "react";
import {CustomDialog} from "./CustomDialog";
import {CardContent, Typography, Select, MenuItem, Paper, InputLabel, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";
import {grey} from "@material-ui/core/colors";
import RichTextEditor from "react-rte";
import {PromptButton} from "../Button/PromptButton";
import shortid from "shortid";
import moment from "moment";
import {removeDataBlogActionCreator, updateArrayDataBlogActionCreator} from "../../store/action/blog";

const initialState = {
    name: '',
    createPost: '',
    description: '',
    available: 'all',
    comments: 'allowed',
    visible: '',
    teaser: '',
    countLike: '',
    countComments: ''
}

interface IState {
    name: string,
    createPost: string,
    description: string,
    available: string,
    comments: string,
    visible: any,
    teaser: string,
    countLike: string,
    countComments: string
}

function DialogEditPost(props: any) {
    const {show, onHide, uuid} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [value, setValue] = React.useState({value: RichTextEditor.createEmptyValue()})
    const [html, setHtml] = React.useState('')
    const [state, setState] = useState<IState>(initialState)

    useEffect(()=>{
        setDialogOpened(show)
        const data: any = Object.values(props.dataBlog.Posts).find((item: any, index) => item.uuid === uuid)
        data && setState({...state,
            name: data.name,
            createPost: data.createPost,
            available: data.available,
            comments: data.comments,
            visible: data.visible,
            teaser: data.teaser,
            description: data.description,
            countLike: data.countLike,
            countComments: data.countComments
        })
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
        const dataPost = {
            uuid,
            createPost: state.createPost,
            name: state.name,
            description: state.description,
            teaser: state.teaser,
            available: state.available,
            comments: state.comments,
            visible: state.visible,
            countLike: state.countLike,
            countComments: state.countComments
        }
        props.action.updateDataBlog('Posts', dataPost, uuid)
    }
    const handleChange = (value: any) => {

        setValue({value});
        setHtml(value.toString('html'));
    };

    const handleRemovePost = () => {
        props.action.removePost('Posts', uuid)
        onHide()
    }

    const handleChangeAvailable = (event: any) => {
        setState({...state, available: event.target.value})
    }
    const handleChangeComment = (event: any) => {
        setState({...state, comments: event.target.value})
    }

    const handleChangeWhoSee = (event: any) => {
        setState({...state, visible: event.target.value})
    }

    const data = {
        title: 'Edit Post',
        content:
            <div>
                <Typography variant="body2"  component="p">
                    <strong>Name</strong>
                </Typography>
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    id="name"
                    name="name"
                    type="text"
                    size={"small"}
                    placeholder="Enter your name"
                    margin="normal"
                    value={state.name}
                    onChange={(e) => setState({...state, name: e.target.value})}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography variant="body2" style={{marginTop: 10}}  component="p">
                    <strong>Main text</strong>
                </Typography>
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    id="description"
                    name="description"
                    type="text"
                    size={"small"}
                    placeholder="Enter description"
                    margin="normal"
                    value={state.description}
                    onChange={(e) => setState({...state, description: e.target.value})}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Grid container spacing={2} style={{marginTop: 20}} >
                    <Grid item xs={6}>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={state.available}
                            onChange={handleChangeAvailable}
                        >
                            <MenuItem value={'all'}>Open for all</MenuItem>
                            <MenuItem value={'sub'}>Only subscribers</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={state.comments}
                            onChange={handleChangeComment}
                        >
                            <MenuItem value={'allowed'}>Comments allowed</MenuItem>
                            <MenuItem value={'notAllowed'}>Comments not allowed</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <Typography variant="body2"  component="p" style={{marginTop: 20}} >
                    <strong>Who can see post</strong>
                </Typography>
                <FormControl variant="outlined" fullWidth>
                    <Select
                        // style={{height: 40}}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={state.visible}
                        onChange={handleChangeWhoSee}
                    >
                        {props.dataBlog.Tiers && Object.values(props.dataBlog.Tiers).map((item: any, index: number) => (
                            <MenuItem key={index} value={item.uuid}>"{item.name}" ({item.cost})</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Typography variant="body2"  component="p" style={{marginTop: 20}} >
                    <strong>Teaser (not for subscribers)</strong>
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
                    id="teaser"
                    name="Teaser"
                    type="text"
                    placeholder={"Enter teaser"}
                    margin="normal"
                    value={state.teaser}
                    onChange={(e) => setState({...state, teaser: e.target.value})}
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
                    disableElevation>
                    save
                </Button>
                <PromptButton name={"Remove task"} onAccept={() => handleRemovePost()}/>
            </>
    }

    return (
        <CustomDialog size={'sm'} data={ data } show={ dialogOpened }  onHide={ onHide }/>
    )
}

function mapStateToProps(state: any) {
    return {
        dataBlog: state.blog
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            setMyPage: (name: string) => dispatch(createPageActionCreator(name)),
            removePost: (name: string, uuid: string) => dispatch(removeDataBlogActionCreator(name, uuid)),
            updateDataBlog: (nameColumn: string, value: any, uuid: string) => dispatch(updateArrayDataBlogActionCreator(nameColumn, value, uuid))

        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogEditPost)