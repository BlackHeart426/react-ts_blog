import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, Typography, Paper} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import {connect} from "react-redux";
import {AddTier} from "./AddTier";
import {EditTier} from "./EditTier";
import {updateArrayPageBlogUserBlogFireBase} from "../../../firebase/database";
import {useParams} from "react-router";
import {updateArrayPageBlogUserBlogActionCreator} from "../../../store/action/currentUser";

export const sortTier = (tier: any) => {
    tier.sort(function(a: any, b: any){
        return a.cost - b.cost //сортировка по возрастающей дате
    })
}

interface ParamTypes {
    userId: string
}

function TierSubscribe(props: any){
    const {editable} =props
    const {userId} = useParams<ParamTypes>();
    const [tier, setTier] = useState([])

    useEffect(()=>{
        if(props.dataBlog) {
            const tier: any = Object.values(props.dataBlog)
            sortTier(tier)
            const myTierData: any = Object.values(props.mySubscriptions).find((item: any) => item.name === userId)
            if(myTierData) {
                tier.map((item: any) => {
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
            const tier: any = Object.values(props.dataBlog)
            sortTier(tier)
            const myTierData: any = Object.values(props.mySubscriptions).find((item: any) => item.name === userId)
            if(myTierData) {
                tier.map((item: any) => {
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

    const handleFollowed = (e: any) => {
        const myTierData: any = Object.values(props.mySubscriptions).find((item: any) => item.name === userId)
        myTierData.tier = e.currentTarget.name
        if(myTierData) {
            props.action.updateSubscription(myTierData)
        } else {
            props.action.addSubscriptionsUserBlogFireBase(myTierData)
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
                ? tier.map((item:any, index: number) => (
                <div key={index}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item.cost} ₽ в месяц
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
                                    onClick={(e) =>handleFollowed(e)}
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

function mapStateToProps(state: any) {
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
            updateSubscription: (value: any) => dispatch(updateArrayPageBlogUserBlogActionCreator('subscriptions', value))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TierSubscribe);