import React, {useEffect, useState, ChangeEvent} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, Typography, Paper} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import {connect} from "react-redux";
import {AddTier} from "./AddTier";
import {EditTier} from "./EditTier";
import {updateArrayPageBlogUserBlogFireBase} from "../../../firebase/database";
import {useParams} from "react-router";
import {
    addSubscriptionUserActionCreator,
    updateArrayPageBlogUserBlogActionCreator
} from "../../../store/action/currentUser";
import {
    updateDataBlogActionCreator,
    updateArrayDataBlogActionCreator,
    addDataBlogActionCreator, addSubscriptionsBlogDataActionCreator
} from "../../../store/action/blog";
import shortid from "shortid";
import {AppState} from "../../../store/reducers/rootReducer";

export const sortTier = (tier: ITier[]) => {
    tier.sort(function(a: any, b: any){
        return a.cost - b.cost
    })
}

interface ParamTypes {
    userId: string
}

export interface ITier {
    cost: string,
    description: string,
    name: string,
    uuid: string,
    active: boolean
}

interface ISubscriptions {
    name: string,
    tier: string,
    uuid: string
}

function TierSubscribe(props: any){
    const {editable} =props
    const {userId} = useParams<ParamTypes>();
    const [tier, setTier] = useState<ITier[]>([])

    useEffect(()=>{
        if(props.dataBlog) {
            const tier: ITier[] = Object.values(props.dataBlog)
            sortTier(tier)
            const myTierData: any = props.mySubscriptions && Object.values(props.mySubscriptions).find((item: any) => item.name === userId)
            console.log('123', typeof myTierData)
            if(myTierData) {
                tier.map((item: ITier) => {
                    if(item.uuid === myTierData.tier) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })
            }
            setTier(tier)
        }
    },[props.dataBlog])

    useEffect(()=>{
        if(props.mySubscriptions) {
            const tier: ITier[] = Object.values(props.dataBlog)
            sortTier(tier)
            const myTierData: any = Object.values(props.mySubscriptions).find((item: any) => item.name === userId)
            if(myTierData) {
                tier.map((item: ITier) => {
                    if(item.uuid === myTierData.tier) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })
            }
            setTier(tier)
        }
    },[props.mySubscriptions])

    const handleFollowed = (event: React.MouseEvent<HTMLButtonElement>) => {
        const userUuid = localStorage.getItem('userId')
        const myTierData: any = props.mySubscriptions && Object.values(props.mySubscriptions).find((item: any) => item.name === userId)

        if(myTierData) {
            myTierData.tier = event.currentTarget && event.currentTarget.name

            props.action.updateSubscription(myTierData)
            props.action.addDataBlog(userUuid, userId, {uuid: userUuid, tier: myTierData.tier})
        } else {

            const newSubscriber = {
                uuid: shortid.generate(),
                tier: event.currentTarget.name,
                name: userId
            }
            props.action.addSubscription(newSubscriber)
        }

    }

    return (
        <>
        <Paper elevation={0} >
            <Typography gutterBottom style={{padding: '15px 20px 5px 20px'}} component="h3">
                <strong>TIER SUBSCRIBE</strong>
            </Typography>
            <Divider />
            {props.dataBlog
                ? tier.map((item:ITier, index: number) => (
                <div key={index}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.cost} ₽ per month
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.description}
                        </Typography >
                            {editable
                                ?  <EditTier uuid={item.uuid}/>
                                :
                                <FormControl fullWidth >
                                <Button
                                    disableElevation
                                    style={{marginTop: 10}}
                                    name={item.uuid}
                                    disabled={item.active}
                                    variant="contained"
                                    onClick={(e: React.MouseEvent<HTMLButtonElement>) =>handleFollowed(e)}
                                    color="primary">
                                    Follow
                                </Button>
                                </FormControl>
                            }
                    </CardContent>
                    <Divider />
                </div>
            ))
            :  <CardContent>
                <Skeleton variant="rect" width={'100%'} height={168} />
            </CardContent>}

        </Paper>
            {editable && <AddTier/>}
            </>
    )
}

function mapStateToProps(state: AppState) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
        mySubscriptions: state.currentUser.subscriptions,
        dataBlog: state.blog.Tiers
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            updateSubscription: (value: any) => dispatch(updateArrayPageBlogUserBlogActionCreator('subscriptions', value)),
            addDataBlog: (userId: string, namePage: string, value: any) => dispatch(addSubscriptionsBlogDataActionCreator(userId, namePage, value)),
            addSubscription: (sub: object) => dispatch(addSubscriptionUserActionCreator(sub))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TierSubscribe);
