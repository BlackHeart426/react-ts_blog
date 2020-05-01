import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {drawerWidth} from "../components/Drawer/Drawer";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {Button, CardMedia} from "@material-ui/core";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import DialogCreatePage from "../components/Dialog/DialogCreatePage";
import cookie from "react-cookies";
import {grey} from "@material-ui/core/colors";
import {CarouselBootstrap} from "../components/CarouselBootstrap";
import {AuthorizationModal} from "../container/Authorization/AuthorizationModal";
import {AppState} from "../store/reducers/rootReducer";

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
        width: 400,
        height: 400,
        right: 0,
        top: 40
    }
})

const Home: React.FC<ReturnType<typeof mapStateToProps>> = ({
    isAuthenticated,
    isMyPage
}) => {
    const history = useHistory();
    const [dialogOpened, setDialogOpened] = useState(false);
    const [myPage, setMyPage] =useState('')
    const classes = useStyles()

    const handleCreatePage =()=>{
        setDialogOpened(true)
    }

    const handleOpenPage =()=>{
        history.push("/"+isMyPage)
    }
//Todo total fnc
    useEffect(()=>{
        const myPageCookie = cookie.load('myPage');
        if(myPageCookie !== "") {
            setMyPage(myPageCookie)
        } else {
            setMyPage(isMyPage)
        }

    },[isMyPage])
    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <div className={classes.image}>
                    <CarouselBootstrap />
                </div>

                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    className={classes.image}*/}
                {/*    width="400px"*/}
                {/*    height="400px"*/}
                {/*    image="https://firebasestorage.googleapis.com/v0/b/ts-blog-45eb9.appspot.com/o/homeImage%2Ftraining.3BZNg.jpg?alt=media&token=709cac4b-87e8-49f1-9646-896e5a0c880a"*/}
                {/*    title="Contemplative Reptile"*/}
                {/*/>*/}
                <div className={classes.content}>
                    <div>
                        <Typography variant="h3" >
                            <strong>Your talent is worth the money</strong>
                        </Typography>
                        <Typography style={{paddingTop: 20}} color="textSecondary"   >
                            New cool communication format with your most dedicated fans
                        </Typography>
                        {isAuthenticated
                            ? myPage
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
                                </>
                            : <AuthorizationModal register={true}/>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}


function mapStateToProps(state: AppState) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
    }
}


export default connect(mapStateToProps) (Home);