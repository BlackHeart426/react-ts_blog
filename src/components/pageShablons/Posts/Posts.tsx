import React, {useEffect, useState, useRef} from "react";
import {
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    InputAdornment,
    Paper,
    Typography,
    Avatar,
    Button,
    Tooltip, MenuItem, FormControl, CardMedia
} from "@material-ui/core";
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
import moment from "moment";
import shortid from "shortid";
import DeleteIcon from '@material-ui/icons/Delete';
import Link from "@material-ui/core/Link";
import {grey} from "@material-ui/core/colors";
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            contentAbout: {
                marginBottom: 10
            },
            grow: {
                flexGrow: 1
            },
            centerContent: {
                margin: '0 auto',
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

const initialComments = {
    comments: []
}

function Posts (props: any) {
    const {userId} = useParams<ParamTypes>();
    const {editable} = props
    const classes = useStyles()
    const [posts, setPosts] = useState([])
    const [showMoreComment, setShowMoreComment] = useState([])
    const [currentComment, setCurrenComment] = useState<any>([])
    const [tierSub, setTierSub] = useState('')
    const [isMyPage, setIsMyPage] = useState(false)

    useEffect(()=>{
        if(props.dataBlog) {
            const posts: any = Object.values(props.dataBlog)
            let newListPosts: any = []
            posts.map( (item: any) => newListPosts[item.uuid] = false)
            sortPost(posts)
            setPosts(posts)
            setShowMoreComment(newListPosts)

        }
        if(userId === props.isisMyPage){
            setIsMyPage(true)
        } else {
            setIsMyPage(false)
        }
    },[props.dataBlog])

    useEffect(()=>{
       let uuidTier = ''
        props.mySub && Object.values(props.mySub).find((item: any) =>{
           if ( item.name === userId) {
               uuidTier = item.tier
           }
       })
        setTierSub(uuidTier)
    },[props.mySub])

    const handleShowMoreComments = (uuidPost: string) => {
        setShowMoreComment({...showMoreComment, [uuidPost]: true})
    }

    const checkLike = (uuid: string) => {
        const data: any = Object.values(props.dataBlog).find((item: any, index) => item.uuid === uuid)
        let existLike: any = false
        if(data) {
            const userUuid = localStorage.getItem('userId');
            existLike = Object.values(data.countLike).find((item, index) => item === userUuid)
        }

        return existLike ? true : false
    }

    const visiblePost = (item: any) => {
        if((item.available === 'all' || props.isMyPage === userId) || ((item.visible === tierSub) && props.isSub)) {
            return true
        } else {
            return false
        }
    }

    const changeLike = (data: any) => {
        const userUuid = localStorage.getItem('userId');
        const existLike = Object.values(data.countLike).find((item, index) => item === userUuid)
        let like: any = []
        if(existLike){
            like = Object.values(data.countLike).filter(item => item !== existLike)
            if(like.length === 0) {
                like = ''
                return like
            } else {
                return [...like]
            }

        } else {
            like = new Set(Object.values(data.countLike).concat(userUuid))
            return [...like]
        }

    }

    const limitedComments = (commetsList: any, uuidPost: any) => {
        let newListPosts: any = []
        if(commetsList.length > 3 && showMoreComment[uuidPost] === false){
            newListPosts = commetsList.slice(commetsList.length-3, commetsList.length)
        } else {
            newListPosts = [...commetsList]
        }
        return newListPosts
    }

    const handleChangeComment = (event: any) => {
        setCurrenComment({...currentComment, [event.target.name]:  {uuid: event.target.name, value: event.target.value, active: event.target.value.trim() ? false : true }})
    }
    const handleSendComment = (uuid: string) => {

        const userUuid = localStorage.getItem('userId')
        const dataComment = {
            uuidComment: shortid.generate(),
            userUuid,
            text: currentComment[uuid].value,
            createComment:  moment().format('LLLL'),
        }

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
            countLike: data.countLike,
            countComments: Object.values(data.countComments).concat(dataComment)
        }
        props.action.updateDataBlog(userId, 'Posts', dataPost, uuid)
        setCurrenComment({...currentComment, [uuid]:  {uuid: uuid, value: ''}})
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

    const changeComment = (data: any, uuidComment: string) => {
        let list: any = Object.values(data.countComments).filter((item: any) => item.uuidComment !== uuidComment)
        if(list.length === 0) {
            list = ''
            return list
        } else {
            return list
        }
    }

    const nameTier = (item: any) => {
        const tier: any = Object.values(props.dataBlogTiers).find((tier:any) => tier.uuid === item.visible)
        return tier ? <>"{tier.name}" ({tier.cost})</>: ''
    }

    const handleDeleteComment = (uuidPost: string, uuidComment: string) => {
        const data: any = Object.values(props.dataBlog).find((item: any, index) => item.uuid === uuidPost)
        const dataPost = {
            uuid: uuidPost,
            createPost: data.createPost,
            name: data.name,
            description: data.description,
            teaser: data.teaser,
            available: data.available,
            comments: data.comments,
            visible: data.visible,
            countLike: data.countLike,
            countComments: changeComment(data, uuidComment)
        }
        props.action.updateDataBlog(userId, 'Posts', dataPost, uuidPost)
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
                            {item.available === 'sub'
                                ? <Tooltip title={nameTier(item)}>
                                    <Typography gutterBottom style={{padding: '15px 40px 5px 20px'}} component="h3">
                                        {'Only subscribers'}
                                    </Typography>
                                </Tooltip>
                                :   <Typography gutterBottom style={{padding: '15px 40px 5px 20px'}} component="h3">
                                    {'For all users'}
                                </Typography>
                            }
                            {editable && <EditPost uuid={item.uuid}/>
                            }
                        </Grid>

                        <Divider />

                        {visiblePost(item)
                        ? <CardContent>
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
                        : <div style={{position: "relative"}}>
                                <CardMedia
                                component="img"
                                height="280"
                                style={{background: grey[100]}}
                                image={"https://firebasestorage.googleapis.com/v0/b/ts-blog-45eb9.appspot.com/o/blur-cover.3INPE.jpg?alt=media&token=6d245d22-b39f-4498-a9c4-cff0609dd70a"}
                                title="Contemplative Reptile"
                            />
                            <div style={{position: "absolute", top: 0, color: '#fff', width: '100%', marginTop: 70}} >
                                <Typography component="p" variant="h6" align="center"   >
                                    <LockIcon fontSize={"large"} />
                                </Typography>
                                <Typography component="p" variant="h6" align="center" >
                                    <strong>Only available to tier subscribers</strong>
                                </Typography>
                                <Typography component="p" align="center" >
                                    {nameTier(item)}
                                </Typography>
                            </div>
                            </div>}

                        <CardContent style={{paddingBottom: 10}}>
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <IconButton
                                        aria-label="toggle  visibility"
                                        disabled={true}
                                        size={"small"}
                                    >
                                        <ChatBubbleOutlineIcon/>
                                    </IconButton>
                                    {item.countComments && item.countComments.length}   Comments
                                </Grid>
                                <Grid item xs={2}>
                                    <IconButton
                                        aria-label="toggle  visibility"
                                        size={"small"}
                                        disabled={!props.isAuth || !(props.isSub && (item.visible === tierSub))}
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

                        {props.isSub && (item.visible === tierSub)
                        ? item.comments === 'allowed'
                            ? <CardContent  style={{paddingBottom: 10}}>
                                {(item.countComments && item.countComments.length > 3 && showMoreComment[item.uuid] === false)
                                &&     <Typography style={{paddingBottom: 15}} variant="body2" color="textSecondary" component="p" >
                                    <Link variant="body2" onClick={() => handleShowMoreComments(item.uuid)}>
                                        Show more comments
                                    </Link>
                                </Typography>}
                                {item.countComments && limitedComments(Object.values(item.countComments), item.uuid).map((comment: any, index: number) => (
                                    <Grid container spacing={3} key={index}>
                                        <Grid item xs={1}>
                                            <Avatar alt="Remy Sharp" src={props.avatar}/>
                                        </Grid>
                                        <Grid item xs={10}>
                                            <Typography variant="body2" component="p" align={"left"}>{comment.userUuid}</Typography>
                                            <Typography variant="body2" component="p" align={"left"}>{comment.text}</Typography>
                                            <Typography color="textSecondary" variant="body2" component="p" align={"left"}>
                                                {comment.createComment}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={1}>
                                            <IconButton aria-label="delete" onClick={() => handleDeleteComment(item.uuid, comment.uuidComment)}
                                                        size={"small"}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                ))

                                }
                                {props.isAuth
                                    ? <Grid container spacing={3}>
                                    <Grid item xs={1}>
                                        <Avatar alt="Remy Sharp" src={props.avatar} />
                                    </Grid>
                                    <Grid item xs={9} style={{paddingRight: 0}}>
                                        <TextField
                                            variant="outlined"
                                            style={{marginTop: 0,  marginBottom: 5, width: '100%'}}
                                            id="comment"
                                            name={item.uuid}
                                            type="comment"

                                            value={currentComment[item.uuid] ? currentComment[item.uuid].value : ''}
                                            size={"small"}
                                            onChange={handleChangeComment}
                                            placeholder="Write comment"
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Button
                                            disableElevation
                                            color={"primary"}
                                            style={{height: 40, width: 77}}
                                            variant={"contained"}
                                            disabled={currentComment[item.uuid] ? currentComment[item.uuid].active : true}
                                            aria-label="delete"
                                            onClick={() => handleSendComment(item.uuid)}>
                                            <TelegramIcon/>
                                        </Button>
                                    </Grid>
                                </Grid>
                                :
                                        <Typography style={{paddingBottom: 5}} color="textSecondary" variant="body2"  component="p" align={"left"}>
                                            Log in to leave comments
                                        </Typography>
                               }
                            </CardContent>
                            :  <CardContent style={{paddingBottom: 16}}>
                                <Typography color="textSecondary" variant="body2"  component="p" align={"left"}>
                                    The author has limited the ability to comment on this post.
                                </Typography>
                            </CardContent> : <></>}
                    </Paper>
                ))
                :   <Paper elevation={0}  style={{marginTop: 20}}><CardContent>
                    <Skeleton variant="rect" width={'100%'} height={168} />
                </CardContent>
                </Paper>
            }
        </>
    )
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
        dataBlog: state.blog.Posts,
        dataBlogTiers: state.blog.Tiers,
        avatar: state.currentUser.Avatar,
        mySub: state.currentUser.subscriptions
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
