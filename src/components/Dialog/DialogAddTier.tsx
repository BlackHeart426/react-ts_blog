import React, {useEffect, useState} from "react";
import {CustomDialog} from "./CustomDialog";
import {CardContent, Typography, Select, MenuItem} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";

function DialogAddTier(props: any) {
    const {show, onHide} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [pageBlog, setPageBlog] = useState('');
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

    const handleBecomeAuthor = () => {
        props.action.setMyPage(pageBlog)
        onHide()
        console.log('become bloger')
    }

    const data = {
        title: 'Add Subscription Tier',
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
                    autoFocus
                    name="name"
                    type="text"
                    size={"small"}
                    placeholder="Enter your name"
                    margin="normal"
                    onChange={(e) => setName(e.target.value)}
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
                    rows={8}
                    inputProps={{
                        maxLength: 150,
                    }}
                    id="description"
                    autoFocus
                    name="Description"
                    type="text"
                    placeholder="Enter your description"
                    margin="normal"
                    onChange={(e) => setDescription(e.target.value)}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography color="textSecondary" variant="body2"  component="p" align={"right"}>
                    {description.length} / 150
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
                    autoFocus
                    name="cost"
                    type="number"
                    size={"small"}
                    placeholder="Cost"
                    margin="normal"
                    onChange={(e) => setCost(e.target.value)}
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
                    Add tier
                </Button>
            </FormControl>
    }

    const extendData =
        <>
            <Typography style={{margin: 15}} variant="h6" component="p" align={"center"}>
                Example categories
            </Typography>
            <FormControl variant="outlined" style={{background: "white", marginLeft: 15, marginRight: 15, minWidth: '90%'}}>
                <Select
                    // style={{height: 40}}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={age}
                    // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </>


    return (
        <CustomDialog extendData={extendData} size={'md'} data={ data } show={ dialogOpened }  onHide={ onHide }/>
    )
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            setMyPage: (name: string) => dispatch(createPageActionCreator(name)),
        }
    }
}

export default connect(null, mapDispatchToProps)(DialogAddTier)