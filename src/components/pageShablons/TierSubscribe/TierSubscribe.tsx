import React, {useEffect} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, Typography, Paper} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Link from "@material-ui/core/Link";
import Skeleton from '@material-ui/lab/Skeleton';
import {getDataBlogActionCreator} from "../../../store/action/blog";
import {connect} from "react-redux";
import {AddTier} from "./AddTier";
import {EditTier} from "./EditTier";

export const listLevels = [
    {
        name: "Tier 1",
        cost: 50,
        description: "Access to the show ",
        active: true
    },
    // {
    //     name: "Tier 2",
    //     cost: 100,
    //     description: "All videos",
    //     active: false
    // },
    // {
    //     name: "Tier 3",
    //     cost: 150,
    //     description: "Special",
    //     active: false
    // },
]
//editable: boolean
function TierSubscribe(props: any){
    const {editable} =props
    return (
        <>
        <Paper elevation={0} >
            <Typography gutterBottom style={{padding: '15px 20px 5px 20px'}} component="h3">
                <strong>TIER SUBSCRIBE</strong>
            </Typography>
            <Divider />
            {props.dataBlog.length > 0
                ? props.dataBlog.map((item:{name:string, cost: number, description: string, active: boolean}, index: number) => (
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
                        </Typography>
                            {editable
                                ?  <EditTier/>
                                :
                                <FormControl fullWidth >
                                <Button
                                    disableElevation
                                    variant="contained"
                                    color="primary">
                                    Followed
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
        dataBlog: state.blog.Tiers
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            // getDataBlog: (userId: string) => dispatch(getDataBlogActionCreator(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TierSubscribe);