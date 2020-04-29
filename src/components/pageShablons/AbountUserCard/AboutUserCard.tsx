import React, {useEffect, useState} from "react";
import {Card, CardContent, Divider, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/Settings';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {getDataBlogActionCreator} from "../../../store/action/blog";
import {connect} from "react-redux";
import {EditAbout} from "./EditAbout";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            contentAbout: {
                marginTop: '10px'
            },
            grow: {
                flexGrow: 1
            }
        }
    )
)
function AboutUserCard(props: any){
    const {editable} = props
    const classes = useStyles()
    const [value, setValue] = useState('')

    useEffect(()=>{
        props.dataBlog && setValue(props.dataBlog)
    },[props.dataBlog])

    return (
        <Paper elevation={0}  >
            <Grid container spacing={3} style={{margin: 0, marginRight: 20}}>
                <Typography gutterBottom style={{padding: '15px 20px 5px 20px'}} component="h3">
                    <strong>ABOUT USER</strong>
                </Typography>
                <div className={classes.grow} />
                {editable && <EditAbout/>
                }
            </Grid>

            <Divider />
            <CardContent>
                <Typography component="p" className={classes.contentAbout}>
                    {value}
                </Typography>
            </CardContent>
        </Paper>
    )
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
        dataBlog: state.blog.About
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            // getDataBlog: (userId: string) => dispatch(getDataBlogActionCreator(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (AboutUserCard);