import React, {useEffect, useState} from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button,
    FormControl,
    Paper,
    CircularProgress
} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import {getDataBlogActionCreator} from "../../store/action/blog";
import {connect} from "react-redux";
import {useParams} from "react-router";
import {addSubscriptionUserActionCreator} from "../../store/action/currentUser";
import {AddPost} from "./Posts/AddPost";
import {grey} from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        contentAvatar: {
            width: '255px',
            padding: '20px'

        },
        buttonProgress: {
            color: '#f15f2c',
            position: 'absolute',
            top: '40%',
            left: '35%',
            marginTop: -12,
            marginLeft: -12,
    },
        }
    )
)

interface ParamTypes {
    userId: string
}

function AvatarUser (props: any) {
    const {userId} = useParams<ParamTypes>();
    const [existSubscription, setExistSubscription] = useState(false)
    const {editable} = props
    const classes = useStyles()

    useEffect(()=>{
        const subscriptions = props.subscriptions
        if(subscriptions) {
            const existSubscription = Object.values(subscriptions).find((item: any) => item.name === userId)
            existSubscription ? setExistSubscription(true) : setExistSubscription(false)
        }
    },[props.subscriptions])

    const handleFollowed = () => {
        const subscription = {
            name: userId,
            tier: 1
        }

        props.action.addSubscription(subscription)
    }


    return (
        <>
            <Paper elevation={0} className={classes.contentAvatar}>
                {!props.dataBlog.Avatar
                    ? <Card
                        style={{background: grey[100], height: 280, position: 'relative'}}
                    ><CircularProgress size={85} className={classes.buttonProgress} />
                    </Card>
                    : <CardMedia
                        component="img"
                        height="280"
                        style={{background: grey[100]}}
                        image={props.dataBlog.Avatar}
                        title="Contemplative Reptile"
                    />
                }
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
                                disabled={existSubscription}
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
                <AddPost/>
            </FormControl>}
        </>
    )
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
        subscriptions: state.currentUser.subscriptions,
        dataBlog: state.blog
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