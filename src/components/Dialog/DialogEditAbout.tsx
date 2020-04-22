import React, {useEffect, useState} from "react";
import {CustomDialog} from "./CustomDialog";
import {CardContent, Typography, Select, MenuItem, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";
import {ToggleButton, ToggleButtonGroup} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
import MUIRichTextEditor from 'mui-rte'
import RichTextEditor from 'react-rte';

const useStyles = makeStyles((theme) => ({
    toggleContainer: {
        margin: theme.spacing(2, 0),
    },
}));

function DialogEditTask(props: any) {
    const classes = useStyles();
    const {show, onHide} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    const [description, setDescription] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [formats, setFormats] = React.useState(() => ['bold']);
    const [value, setValue] = React.useState({value: RichTextEditor.createEmptyValue()})
    const [html, setHtml] = React.useState('')


    useEffect(()=>{
        setDialogOpened(show)
    },[show])

    useEffect(() => {
        if (html.trim()){
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [html]);

    const handleSave = () => {
        onHide()

    }
    const handleChange = (value: any) => {

        setValue({value});
        setHtml(value.toString('html'));
    };

    const data = {
        title: 'About Author',
        content:
            <div>
                <RichTextEditor
                    value={value.value}
                    onChange={handleChange}
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