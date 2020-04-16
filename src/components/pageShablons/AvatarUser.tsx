import React, {useEffect} from "react";
import {Card, CardContent, CardMedia, Typography, CardActions, Button, FormControl, Paper} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import {getDataBlogActionCreator} from "../../store/action/blog";
import {connect} from "react-redux";
import {useParams} from "react-router";
import {addSubscriptionUserActionCreator} from "../../store/action/currentUser";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            contentAvatar: {
                width: '255px',
                padding: '20px'

            }
        }
    )
)

interface ParamTypes {
    userId: string
}

function AvatarUser (props: any) {
    const {userId} = useParams<ParamTypes>();
    const {editable} = props
    const classes = useStyles()

    const handleFollowed = () => {
        let listSubscriptions = []
        const subscription = {
            name: userId,
            tier: 1
        }
        if(props.subscriptions) {
            listSubscriptions = [subscription, props.subscriptions]
        } else {
            listSubscriptions = [subscription]
        }

        debugger
        props.action.addSubscription(listSubscriptions)
    }

    return (
        <>
            <Paper elevation={0} className={classes.contentAvatar}>
                <CardMedia
                    component="img"
                    height="280"
                    image="https://images.boosty.to/user/9647/avatar?change_time=1561378020&croped=1&mh=560&mw=450"
                    title="Contemplative Reptile"
                />
                {!editable && <>
                    <CardContent>
                        <Typography  align="center" gutterBottom variant="h5" component="h2">
                            42
                        </Typography>
                        <Typography align="center" variant="body2" color="textSecondary" component="p">
                            Subscribers
                        </Typography>
                    </CardContent>
                    <CardActions style={{padding: 0}}>
                        <FormControl fullWidth>
                            <Button
                                disableElevation
                                variant="outlined"
                                onClick={handleFollowed}
                                startIcon={<PersonIcon/>}
                                color="primary">
                                Followed
                            </Button>
                        </FormControl>
                    </CardActions>
                </>
                }
            </Paper>
            {editable && <FormControl fullWidth style={{marginTop: 15}}>
                <Button
                    disableElevation
                    variant="contained"
                    startIcon={<EditIcon/>}
                    color="primary">
                    <strong>New post</strong>
                </Button>
            </FormControl>}
        </>
    )
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
        subscriptions: state.currentUser.subscriptions,
        dataBlog: state.blog.dataBlog
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            addSubscription: (sub: object) => dispatch(addSubscriptionUserActionCreator(sub))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AvatarUser);