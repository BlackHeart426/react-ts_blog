import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import AvatarUser from "../components/pageShablons/AvatarUser";
import CoverContent from "../components/pageShablons/CoverContent";
import AboutUserCard from "../components/pageShablons/AboutUserCard";
import {LevelSubscribe} from "../components/pageShablons/LevelSubscribe";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button, FormControl, Grid, Paper} from "@material-ui/core";
import Tasks from "../components/pageShablons/Tasks";
import Posts from "../components/pageShablons/Posts";
import {connect} from "react-redux";
import { getDataBlogActionCreator } from "../store/action/blog";
import {withAuthorization} from "../firebase/hoc/withAuthorization";
import { compose } from "redux";
import {withCheckPage} from "../firebase/hoc/withCheckPage";
import {Footer} from "../components/Footer";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            backgroundImage: {
                position: 'relative',
                width: '100%',
                height: '310px',
                top: '0',
                left: '0',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/ts-blog-45eb9.appspot.com/o/logo%2Fbackground_065.jpg?alt=media&token=7c4b3ee2-9e75-42f2-97ab-5f17c5b31989)",
            },
            layout : {
                // position: 'relative',
                minWidth: '1240px',
                minHeight: 1200,
                flex: '1',
            },
            content : {
                marginTop: '15px',
                width: '1240px',
                margin: '0 auto',
                paddingBottom: '20px'
            },
            contentInfo : {
                width: '1240px',
                margin: '0 auto',
                paddingBottom: '20px',
                paddingTop: '195px',

                color: 'white'
            },
            paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
            },
            contentAvatar: {
                position: 'absolute',
                top: '100px',

            }
        }
    )
);

interface ParamTypes {
    userId: string
}

function TemplatePage(props: any) {
    const {userId} = useParams<ParamTypes>();
    const classes = useStyles()
    const [state, setState] = useState({editable: false});

    useEffect(()=>{
        props.action.getDataBlog(userId)
        props.isMyPage === userId
            ? setState({...state, editable: true})
            : setState({...state, editable: false})
    },[userId]);

    useEffect(()=>{
        props.isMyPage === userId
            ? setState({...state, editable: true})
            : setState({...state, editable: false})
    },[props.isMyPage]);

    return (
        <>

            <div className={classes.layout}>
                <div className={classes.backgroundImage}>
                    {state.editable && <Button
                        disableElevation
                        variant="contained"
                        style={{background: '#fff', position: "absolute", right: 300, marginTop: 40}}
                        color="inherit">
                        <strong>Change background</strong>
                    </Button>
                    }
                    <div className={classes.contentInfo}>
                        <CoverContent/>
                    </div>

                </div>
                <div className={classes.content}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <div className={classes.contentAvatar}>
                                <AvatarUser editable={state.editable}/>
                                <Tasks editable={state.editable}/>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <AboutUserCard editable={state.editable}/>
                            <Posts/>
                        </Grid>
                        <Grid item xs={3}>
                            <LevelSubscribe editable={state.editable}/>
                        </Grid>
                    </Grid>
                </div>
            </div>
            <Footer/>
        </>
    )
}
function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
        dataBlog: state.blog.dataBlog
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            getDataBlog: (userId: string) => dispatch(getDataBlogActionCreator(userId))
        }
    }
}

export default compose(
    withCheckPage,
    connect(mapStateToProps, mapDispatchToProps))
(TemplatePage);