import React, {useEffect, useState} from "react";
import {CustomDialog} from "./CustomDialog";
import {CardContent, Typography, Select, MenuItem, Paper, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";
import {grey, red} from "@material-ui/core/colors";
import GroupIcon from '@material-ui/icons/Group';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {addDataBlogActionCreator} from "../../store/action/blog";
import shortid from "shortid";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            paper: {
                height: 130,
                borderColor: grey[200]
            },
            paperActive: {
                height: 130,
                borderColor: red[200],
                background: '#fffaf9'
            },
        }
    )
)

function DialogAddTask(props: any) {
    const {show, onHide} = props;
    const classes = useStyles();
    const [dialogOpened, setDialogOpened] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [task, setTask] = useState('money');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(()=>{
        setDialogOpened(show)
    },[show])

    useEffect(() => {
        if (name.trim() && description.trim()){
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [name, description]);

    const handleAddTask = () => {
        onHide()
        const dataTier = {
            uuid: shortid.generate(),
            name,
            description,
            task
        }
        props.action.addDataBlog('Tasks', dataTier)
    }

    const handleSelectTask = (name: string) => {
        setTask(name)
    }

    const data = {
        title: 'Add Task',
        content:
            <div>
                <Typography color="textSecondary" variant="body2"  component="p" align={"left"} style={{marginBottom: 10}}>
                    Using goals, you can easily tell your subscribers what you want to achieve.
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Paper
                            variant="outlined"
                            square
                            onClick={()=>handleSelectTask('sub')}
                            className={task === 'sub' ? classes.paperActive : classes.paper} >
                            <div style={{margin: 20}}>
                                <Typography align={"center"}>
                                    <GroupIcon style={{ fontSize: 40 }} color={"primary"} />
                                </Typography>
                                <Typography variant="body2"  component="p" align={"center"}>
                                    I want to get a certain number of subscribers
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6} style={{marginBottom: 20}}>
                        <Paper
                            variant="outlined"
                            square
                            onClick={()=>handleSelectTask('money')}
                            className={task === 'money' ? classes.paperActive : classes.paper} >
                            <div style={{margin: 20}}>
                                <Typography align={"center"}>
                                    <CreditCardIcon style={{ fontSize: 40 }} color={"primary"} />
                                </Typography>
                                <Typography variant="body2" component="p" align={"center"}>
                                    I want to collect money in one-time payments
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                </Grid>

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
                    placeholder={task === 'sub' ? '1000 sub per month': '10 000 '}
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
                    placeholder={task === 'sub'
                        ? 'For example: when I get 1,000 paid subscribers, I can devote more time to creativity'
                        : 'For example: I can buy a set of acrylic paints to start painting in a new style for you'}
                    margin="normal"
                    onChange={(e) => setDescription(e.target.value)}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography color="textSecondary" variant="body2"  component="p" align={"right"}>
                    {description.length} / 150
                </Typography>
            </div>,
        action:
            <FormControl fullWidth >
                <Button
                    variant="contained"
                    disableElevation
                    size="large"
                    color="primary"
                    // className={classes.loginBtn}
                    onClick={handleAddTask}
                    disabled={isButtonDisabled}>
                    Add tier
                </Button>
            </FormControl>
    }

    return (
        <CustomDialog size={'sm'} data={ data } show={ dialogOpened }  onHide={ onHide }/>
    )
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            addDataBlog: (nameColumn: string, value: any) => dispatch(addDataBlogActionCreator(nameColumn, value, true))
        }
    }
}

export default connect(null, mapDispatchToProps)(DialogAddTask)
