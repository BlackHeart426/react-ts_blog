import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import AvatarUser from "../components/pageShablons/AvatarUser";
import CoverContent from "../components/pageShablons/CoverContent";
import AboutUserCard from "../components/pageShablons/AbountUserCard/AboutUserCard";
import TierSubscribe from "../components/pageShablons/TierSubscribe/TierSubscribe";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Button, FormControl, Grid, Paper} from "@material-ui/core";
import Tasks from "../components/pageShablons/Tasks/Tasks";
import Posts from "../components/pageShablons/Posts/Posts";
import {connect} from "react-redux";
import {getDataBlogActionCreator, updateDataBlogActionCreator} from "../store/action/blog";
import { compose } from "redux";
import {withCheckPage} from "../firebase/hoc/withCheckPage";
import {Footer} from "../components/Footer";
import {onComplete, updateBackgroundUser} from "../firebase/storage";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            root: {
                '& > *': {
                    margin: theme.spacing(1),
                },
                display: 'flex',
                position: 'absolute',
                right: 200,
                alignItems: 'center',
            },
            backgroundImage: {
                position: 'relative',
                width: '100%',
                height: '310px',
                top: '0',
                left: '0',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundColor:' #c7b39b',
                // backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/ts-blog-45eb9.appspot.com/o/logo%2Fbackground_065.jpg?alt=media&token=7c4b3ee2-9e75-42f2-97ab-5f17c5b31989)",
                // background: '"linear-gradient( rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.5) )", "url(https://firebasestorage.googleapis.com/v0/b/ts-blog-45eb9.appspot.com/o/logo%2Fbackground_065.jpg?alt=media&token=7c4b3ee2-9e75-42f2-97ab-5f17c5b31989)"',
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

            },
            wrapper: {
                margin: theme.spacing(1),
                position: 'relative',
            },
            input: {
                display: 'none',
            },
        }
    )
);

interface ParamTypes {
    userId: string
}

function TemplatePage(props: any) {
    const property = {
        image: {},
        url: '',
        progress: 0
    }
    const {userId} = useParams<ParamTypes>();
    const classes = useStyles()
    const [state, setState] = useState({editable: false});
    const [imageState, setImageState] = useState(property);

    useEffect(()=>{
        props.action.getDataBlog(userId)
        props.isMyPage === userId
            ? setState({...state, editable: true})
            : setState({...state, editable: false})
    },[userId]);

    useEffect(()=>{
        props.dataBlog && setImageState(props.dataBlog.Background)
    },[props.dataBlog])

    useEffect(()=>{
        props.isMyPage === userId
            ? setState({...state, editable: true})
            : setState({...state, editable: false})
    },[props.isMyPage]);


    const handleImage = (name: string) => {
        console.log(name)
    }

    const handleChange = (event: any) => {
        const image = event.target.files[0];
        handleUpload(image)
    }

    const handleUpload = (image: string) =>  {
        updateBackgroundUser(image)
            .on('state_changed',
                (snapshot: any) => {
                },
                (error: Error) => {
                },
                () => {
                    // complete function ....
                    onComplete(image, props.action.updateDataBlog, 'Background')
                        .then(response => {

                        })
                        .catch(error => {

                        })
                });
    }

    return (
        <>

            <div className={classes.layout}>
                <div className={classes.backgroundImage} style={{backgroundImage: 'url('+ imageState +')'}}>
                    {state.editable
                    &&
                    <>
                        <div >
                            <div className={classes.root}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    multiple
                                    onChange={handleChange}
                                    type="file"
                                />

                                <label htmlFor="contained-button-file">
                                    <div className={classes.wrapper}>
                                        <Button
                                            disableElevation
                                            component="span"
                                            variant="contained"
                                            color="secondary">
                                            <strong>Change background</strong>
                                        </Button>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </>
                    }
                    <div className={classes.contentInfo}>
                        <CoverContent editable={state.editable}/>
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
                            <Posts editable={state.editable}/>
                        </Grid>
                        <Grid item xs={3}>
                            <TierSubscribe editable={state.editable}/>
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
        dataBlog: state.blog
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            getDataBlog: (userId: string) => dispatch(getDataBlogActionCreator(userId)),
            updateDataBlog: (nameColumn: string, value: any) => dispatch(updateDataBlogActionCreator(nameColumn, value))
        }
    }
}

export default compose(
    withCheckPage,
    connect(mapStateToProps, mapDispatchToProps))
(TemplatePage);