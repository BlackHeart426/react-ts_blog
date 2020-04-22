import React from "react";
import {Card, CardContent, Divider, Grid, IconButton, InputAdornment, Paper, Typography, Avatar} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/Settings';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import {AccountCircle, Visibility, VisibilityOff} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import TelegramIcon from '@material-ui/icons/Telegram';
import {connect} from "react-redux";
import {EditPost} from "./EditPost";
import Skeleton from "@material-ui/lab/Skeleton";


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

function Posts (props: any) {
    const {editable} = props
    const classes = useStyles()
    return (
    <>
        {props.dataBlog
                ? Object.values(props.dataBlog).map((item:any, index: number) => (
                <Paper elevation={0}  style={{marginTop: 20}}>
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
                                >
                                    <FavoriteBorderIcon/>

                                </IconButton>
                                0
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
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
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
        dataBlog: state.blog.Posts
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            // getDataBlog: (userId: string) => dispatch(getDataBlogActionCreator(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Posts);