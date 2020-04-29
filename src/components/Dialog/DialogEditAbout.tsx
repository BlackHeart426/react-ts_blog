import React, {useEffect, useState} from "react";
import {CustomDialog} from "./CustomDialog";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";
import {makeStyles} from "@material-ui/core/styles";
import RichTextEditor from 'react-rte';
import {updateDataBlogActionCreator} from "../../store/action/blog";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
}));

function DialogEditTask(props: any) {
    const {show, onHide} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    // const [value, setValue] = React.useState({value: RichTextEditor.createEmptyValue()})
    const [description, setDescription] = React.useState('')
    // const [html, setHtml] = React.useState('')


    useEffect(()=>{
        setDialogOpened(show)
        setDescription(props.dataBlog)
        // setValue(props.dataBlog)
    },[show])
    // useEffect(() => {
    //     if (description.trim()){
    //         setIsButtonDisabled(false);
    //     } else {
    //         setIsButtonDisabled(true);
    //     }
    // }, [description]);


    const handleSave = () => {
        onHide()
        props.action.updateDataBlog('About', description)
    }
    // const handleChange = (value: any) => {
    //
    //     // setValue({value});
    //     console.log(value)
    //     setHtml(value.toString('html'));
    // };

    const data = {
        title: 'About Author',
        content:
            <div>
                {/*<RichTextEditor*/}
                {/*    value={value.value}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    multiline
                    rows={8}
                    value={description}
                    id="description"
                    name="Description"
                    type="text"
                    placeholder={"Enter description"}
                    margin="normal"
                    onChange={(e) => setDescription(e.target.value)}
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
                    onClick={handleSave}>
                    save
                </Button>
            </>
    }

    return (
        <CustomDialog size={'sm'} data={ data } show={ dialogOpened }  onHide={ onHide }/>
    )
}

function mapStateToProps(state: any) {
    return {
        dataBlog: state.blog.About
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            updateDataBlog: (nameColumn: string, value: any) => dispatch(updateDataBlogActionCreator(nameColumn, value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogEditTask)