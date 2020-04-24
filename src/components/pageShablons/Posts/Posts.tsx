import React, {useEffect, useState} from "react";
import {Card, CardContent, Divider, Grid, IconButton, InputAdornment, Paper, Typography, Avatar} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import TextField from "@material-ui/core/TextField";
import TelegramIcon from '@material-ui/icons/Telegram';
import {connect} from "react-redux";
import {EditPost} from "./EditPost";
import Skeleton from "@material-ui/lab/Skeleton";
import {updateLikeCommentDataBlogActionCreator} from "../../../store/action/blog";
import {useParams} from "react-router";
import {red} from "@material-ui/core/colors";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            contentAbout: {
                marginBottom: 10
            },
            grow: {
                flexGrow: 1
            }
        }
    )
)

export const sortPost = (posts: any) => {
    posts.sort(function(a: any, b: any){
        let dateA: any = new Date(a.createPost), dateB: any = new Date(b.createPost)
        return dateB - dateA //сортировка по возрастающей дате
    })
}

interface ParamTypes {
    userId: string
}

function Posts (props: any) {
    const {userId} = useParams<ParamTypes>();
    const {editable} = props
    const classes = useStyles()
    const [posts, setPosts] = useState([])

    useEffect(()=>{
        if(props.dataBlog) {
            const posts: any = Object.values(props.dataBlog)
            sortPost(posts)
            setPosts(posts)
        }
    },[props.dataBlog])

    const checkLike = (uuid: string) => {
        const data: any = Object.values(props.dataBlog).find((item: any, index) => item.uuid === uuid)
        const userUuid = localStorage.getItem('userId');
        const existLike = Object.values(data.countLike).find((item, index) => item === userUuid)
        return existLike ? true : false
    }

    const changeLike = (data: any) => {
        const userUuid = localStorage.getItem('userId');
        const existLike = Object.values(data.countLike).find((item, index) => item === userUuid)
        console.log(existLike)
        let like: any = []
        if(existLike){
            like = Object.values(data.countLike).filter(item => item !== existLike)
            console.log(like)
        } else {
            like = new Set(Object.values(data.countLike).concat(userUuid))
        }


        return [...like]
    }

    const handleChangeLike = (uuid: string) => {
        const data: any = Object.values(props.dataBlog).find((item: any, index) => item.uuid === uuid)
        const dataPost = {
            uuid,
            createPost: data.createPost,
            name: data.name,
            description: data.description,
            teaser: data.teaser,
            available: data.available,
            comments: data.comments,
            visible: data.visible,
            countLike: changeLike(data),
            countComments: data.countComments
        }
        props.action.updateDataBlog(userId, 'Posts', dataPost, uuid)
    }

    return (
    <>
        {props.dataBlog
                ? posts.map((item:any, index: number) => (
                <Paper elevation={0}  style={{marginTop: 20}} key={index}>
                    <Grid container spacing={3} style={{margin: 0, marginRight: 20}}>
                        <Typography gutterBottom style={{padding: '15px 20px 5px 20px'}} component="h3">
                            {item.createPost}
                        </Typography>
                        <div className={classes.grow} />
                        {editable && <EditPost uuid={item.uuid}/>
                        }
                    </Grid>

                    <Divider />
                    <CardContent>
                        <Typography component="p" variant="h6"  className={classes.contentAbout}>
                            <strong> {item.name}</strong>
                        </Typography>
                        <Typography component="p" className={classes.contentAbout}>
                            {item.text}
                        </Typography>
                        <Typography component="p" className={classes.contentAbout}>
                            {item.description}
                        </Typography>
                    </CardContent>

                    <CardContent style={{paddingBottom: 10}}>
                        <Grid container spacing={3}>
                            <Grid item xs={3}>
                                <IconButton
                                    aria-label="toggle  visibility"
                                    size={"small"}
                                >
                                    <ChatBubbleOutlineIcon/>
                                </IconButton>
                                0   Comments
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    aria-label="toggle  visibility"
                                    size={"small"}
                                    onClick={() => handleChangeLike(item.uuid)}
                                >
                                    {checkLike(item.uuid) ? <FavoriteIcon/> : <FavoriteBorderIcon />}

                                </IconButton>
                                {item.countLike ? item.countLike.length : 0}
                            </Grid>
                            <Grid item xs={7}>
                                <IconButton
                                    aria-label="toggle  visibility"
                                    size={"small"}
                                >
                                    <ShareIcon/>
                                </IconButton>
                                Share
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardContent  style={{paddingBottom: 10}}>
                        <Grid container spacing={3}>
                            <Grid item xs={1}>
                                <Avatar alt="Remy Sharp" src={props.avatar} />
                            </Grid>
                            <Grid item xs={11}>
                                <TextField
                                    variant="outlined"
                                    style={{marginTop: 0,  marginBottom: 5, width: '100%'}}
                                    id="comment"
                                    name="comment"
                                    type="comment"
                                    size={"small"}
                                    InputProps={{
                                        endAdornment: <TelegramIcon fontSize={"large"}/>,
                                    }}
                                    // label="Comment"
                                    placeholder="Write comment"
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>


                    </CardContent>
                </Paper>
                ))
                :  <CardContent>
                    <Skeleton variant="rect" width={'100%'} height={168} />
                </CardContent>
        }
    </>
    )
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
        dataBlog: state.blog.Posts,
        avatar: state.blog.Avatar
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            // getDataBlog: (userId: string) => dispatch(getDataBlogActionCreator(userId)
            updateDataBlog: (nameBlog: string, nameColumn: string, value: any, uuid: string) => dispatch(updateLikeCommentDataBlogActionCreator(nameBlog, nameColumn, value, uuid))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Posts);