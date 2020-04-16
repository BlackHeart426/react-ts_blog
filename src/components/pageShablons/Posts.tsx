import React from "react";
import {Card, CardContent, Divider, Grid, IconButton, InputAdornment, Paper, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/Settings';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShareIcon from '@material-ui/icons/Share';
import {AccountCircle, Visibility, VisibilityOff} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import TelegramIcon from '@material-ui/icons/Telegram';
import {getDataBlogActionCreator} from "../../store/action/blog";
import {connect} from "react-redux";

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

export const listPosts = [
    {
        date: "14.04.2020 в 11:27",
        uuid: '293642-31s5f1s6-df16238',
        tier: [],
        title: 'test1',
        content: {img: ''},
        description: "Access to the show ",
        comment: [],
        like: 2
    },
    {
        name: "12.04.2020 в 11:27",
        uuid: 'f6543-2615564-f16238',
        tier: [],
        title: 'test',
        content: {video: ''},
        description: "All videos",
        comment: [],
        like: 10
    },
]

function Posts (props: any) {
    const {editable} = props
    const classes = useStyles()
    return (
        <Paper elevation={0}  style={{marginTop: 20}}>
            <Grid container spacing={3} style={{margin: 0, marginRight: 20}}>
                <Typography gutterBottom style={{padding: '15px 20px 5px 20px'}} component="h3">
                    08 апреля в 11:27
                </Typography>
                <div className={classes.grow} />
                {editable && <IconButton
                    style={{marginRight: 25}}
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}

                >
                    <SettingsIcon/>
                </IconButton>
                }
            </Grid>

            <Divider />
            <CardContent>
                <Typography component="p" variant="h6"  className={classes.contentAbout}>
                    <strong>Subscribers</strong>
                </Typography>
                <Typography component="p" className={classes.contentAbout}>
                    Subscribers
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
                <AccountCircle fontSize={"large"}/>
                <TextField
                    variant="outlined"
                    style={{marginTop: 0, marginLeft: 10, marginBottom: 5, width: '92%'}}
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
            </CardContent>
        </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps) (Posts);