import React, {ChangeEvent, useEffect, useState} from "react";
import {CustomDialog} from "./CustomDialog";
import {CardContent, Typography, Select, MenuItem, Paper, InputLabel, Grid} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import {connect} from "react-redux";
import {createPageActionCreator} from "../../store/action/currentUser";
import {addDataBlogActionCreator} from "../../store/action/blog";
import shortid from "shortid";
import moment from "moment";


const initialState = {
    amount: '',
    description: '',
}

interface IState {
    amount: string,
    description: string,
}

function DialogTaskPay(props: any) {
    const {show, onHide, onMoney} = props;
    const [dialogOpened, setDialogOpened] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    const [state, setState] = useState<IState>(initialState)


    useEffect(()=>{
        setDialogOpened(show)
    },[show])

    const handlePay = (event: any) => {
        onMoney(state.amount)
        onHide()
    }

    const data = {
        title: 'Pay',
        content:
            <div>
                <Typography variant="body2"  component="p">
                    <strong>Amount</strong>
                </Typography>
                <TextField
                    variant="outlined"
                    style={{marginTop: 5}}
                    fullWidth
                    id="Amount"
                    name="Amount"
                    type="text"
                    size={"small"}
                    placeholder="Enter your Amount"
                    margin="normal"
                    onChange={(e) => setState({...state, amount: e.target.value})}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />
                <Typography variant="body2" style={{marginTop: 10}}  component="p">
                    <strong>Description</strong>
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
                    onChange={(e) => setState({...state, description: e.target.value})}
                    // onKeyPress={(e)=>handleKeyPress(e)}
                />

            </div>,
        action:
            <>
                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    // className={classes.loginBtn}
                    onClick={handlePay}
                    disableElevation>
                    Pay
                </Button>
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
            addDataBlog: (nameColumn: string, value: any) => dispatch(addDataBlogActionCreator(nameColumn, value, true))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogTaskPay)