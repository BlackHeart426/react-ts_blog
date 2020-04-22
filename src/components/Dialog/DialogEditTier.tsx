import React, {useEffect, useState} from "react";
import {CustomDialog} from "./CustomDialog";
import {CardContent, Typography, Select, MenuItem, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";
import {grey} from "@material-ui/core/colors";
import {
    removeDataBlogActionCreator,
    updateArrayDataBlogActionCreator,
    updateDataBlogActionCreator
} from "../../store/action/blog";
import shortid from "shortid";

const initialState = {
    name: '',
    cost: '',
    description: ''
}

interface IState {
    name: string,
    cost: string,
    description: string
}

function DialogEditTier(props: any) {
    const {show, onHide, uuid} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    const [state, setState] = useState<IState>(initialState);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(()=>{
        setDialogOpened(show)
        const data: any = Object.values(props.dataBlog).find((item: any, index) => item.uuid === uuid)
        console.log( data)
        data && setState({...state, name: data.name, cost: data.cost, description: data.description})
    },[show])

    useEffect(() => {
        if (state.name.trim() && state.cost.trim() && state.description.trim()){
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [state.name, state.cost, state.description]);

    const handleSave = () => {
        const dataTier = {
            uuid,
            name: state.name,
            description: state.description,
            cost: state.cost
        }
        onHide()
        props.action.updateDataBlog('Tiers', dataTier, uuid)
    }

    const handleRemoveTier = () => {
        props.action.removeTier('Tiers', uuid)
        onHide()
    }

    const data = {
        title: 'Edit Tier',
        content:
            <div>
                <Typography variant="body2"  component="p">
                    Name
                </Typography>
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    id="name"
                    name="name"
                    value={state.name}
                    type="text"
                    size={"small"}
                    placeholder="Enter your name"
                    margin="normal"
                    onChange={(e) => setState({...state, name: e.target.value})}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography variant="body2"  component="p">
                    Description
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
                    placeholder="Enter your description"
                    margin="normal"
                    onChange={(e) => setState({...state, description: e.target.value})}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography color="textSecondary" variant="body2"  component="p" align={"right"}>
                    {state.description.length} / 150
                </Typography>
                <Typography variant="body2"  component="p">
                    The cost of a monthly subscription (in rubles)
                </Typography>
                <Typography color="textSecondary"  variant="body2"  component="p">
                    The maximum subscription cost is 100,000 rubles.
                </Typography>
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    id="cost"
                    name="cost"
                    value={state.cost}
                    type="number"
                    size={"small"}
                    placeholder="Cost"
                    margin="normal"
                    onChange={(e) => setState({...state, cost: e.target.value})}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
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
                <Button
                    variant="outlined"
                    disableElevation
                    size="large"
                    color="primary"
                    // className={classes.loginBtn}
                    onClick={handleRemoveTier}>
                    remove tier
                </Button>
            </>
    }

    return (
        <CustomDialog size={'sm'} data={ data } show={ dialogOpened }  onHide={ onHide }/>
    )
}


function mapStateToProps(state: any) {
    return {
        dataBlog: state.blog.Tiers
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

export default connect(mapStateToProps, mapDispatchToProps)(DialogEditTier)