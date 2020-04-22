import React, {useEffect} from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, Typography, Paper} from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import {connect} from "react-redux";
import {AddTier} from "./AddTier";
import {EditTier} from "./EditTier";

function TierSubscribe(props: any){
    const {editable} =props
    return (
        <>
        <Paper elevation={0} >
            <Typography gutterBottom style={{padding: '15px 20px 5px 20px'}} component="h3">
                <strong>TIER SUBSCRIBE</strong>
            </Typography>
            <Divider />
            {props.dataBlog
                ? Object.values(props.dataBlog).map((item:any, index: number) => (
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
                                ?  <EditTier uuid={item.uuid}/>
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