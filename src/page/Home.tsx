import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {drawerWidth} from "../components/Drawer/Drawer";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {Button} from "@material-ui/core";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import DialogCreatePage from "../components/Dialog/DialogCreatePage";
import cookie from "react-cookies";

const useStyles = makeStyles({
    root: {
        background: '#fff',
    },
    container: {
        width: 1240,
        margin: '0 auto',
        paddingBottom: 20,
        position: 'relative'
    },
    content: {
       paddingTop: 150
    },
    image: {
        position: 'absolute',
    }
})

function Home(props: any) {
    const history = useHistory();
    const [dialogOpened, setDialogOpened] = useState(false);
    const [myPage, setMyPage] =useState('')
    const classes = useStyles()

    const handleCreatePage =()=>{
        setDialogOpened(true)
    }

    const handleOpenPage =()=>{
        history.push("/"+props.isMyPage)
    }
//Todo total fnc
    useEffect(()=>{
        const myPageCookie = cookie.load('myPage');
        if(myPageCookie !== "") {
            setMyPage(myPageCookie)
        } else {
            setMyPage(props.isMyPage)
        }

    },[props.isMyPage])
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.content}>
                    <div>
                        <Typography variant="h3" >
                            <strong>Your talent is worth the money</strong>
                        </Typography>
                        <Typography style={{paddingTop: 20}} color="textSecondary"   >
                            New cool communication format with your most dedicated fans
                        </Typography>
                        {myPage
                            ? <Button
                            style={{marginTop: 20, height: 60}}
                            disableElevation
                            variant="contained"
                            size={"large"}
                            onClick={handleOpenPage}
                            color="primary">
                            <strong>Open my page</strong>
                        </Button>
                        : <><Button
                                style={{marginTop: 20, height: 60}}
                                disableElevation
                                variant="contained"
                                size={"large"}
                                onClick={handleCreatePage}
                                color="primary">
                                <strong>Create page</strong>
                            </Button>
                            <DialogCreatePage
                                show={ dialogOpened }
                                onHide={ () => setDialogOpened(false)}
                            />
                            </>}
                    </div>
                </div>
            </div>
        </div>
    )
}


function mapStateToProps(state: any) {
    return {
        isMyPage: state.currentUser.myPage,
    }
}


export default connect(mapStateToProps) (Home);