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

function DialogAddPost(props: any) {
    const {show, onHide} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [value, setValue] = React.useState({value: RichTextEditor.createEmptyValue()})
    const [html, setHtml] = React.useState('')

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

    const handleChange = (value: any) => {

        setValue({value});
        setHtml(value.toString('html'));
    };

    const data = {
        title: 'New Post',
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
                    onChange={(e) => setName(e.target.value)}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography variant="body2" style={{marginTop: 10}}  component="p">
                    <strong>Main text</strong>
                </Typography>
                <RichTextEditor
                    value={value.value}
                    onChange={handleChange}
                />
                <Grid container spacing={2} style={{marginTop: 20}} >
                    <Grid item xs={6}>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            fullWidth
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
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
                        // value={categories}
                        // value={age}
                        // onChange={handleChangeCategories}
                    >
                        <MenuItem value={'total'}>Total</MenuItem>
                        <MenuItem value={'blog'}>Blog</MenuItem>
                        <MenuItem value={'videos'}>Videos</MenuItem>
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
                    id="description"
                    name="Description"
                    type="text"
                    placeholder={"Enter teaser"}
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
                    disableElevation
                    disabled={isButtonDisabled}>
                    save
                </Button>
                <Button
                    variant="outlined"
                    size="large"
                    disableElevation
                    color="primary"
                    // className={classes.loginBtn}
                    onClick={handleSave}>
                    remove tier
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

export default connect(null, mapDispatchToProps)(DialogAddPost)