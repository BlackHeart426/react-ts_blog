import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    FormControl,
    Typography,
    Paper,
    LinearProgress,
    lighten,
    withStyles
} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import Link from "@material-ui/core/Link";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {getDataBlogActionCreator} from "../../../store/action/blog";
import {connect} from "react-redux";
import {AddTasks} from "./AddTasks";
import {EditTask} from "./EditTask";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            contentTasks: {
                width: 295,
                marginTop: 20

            },
            content: {
                paddingTop: 5,
                paddingBottom: 5
            }
        }
    )
)

function Tasks (props: any) {
    const {editable} =props
    const classes = useStyles()

    const BorderLinearProgress = withStyles({
        root: {
            height: 10,
            backgroundColor: lighten('#ff6c5c', 0.5),
        },
        bar: {
            borderRadius: 20,
            backgroundColor: '#ff6c5c',
        },
    })(LinearProgress);
    return (
        <>
            <Paper elevation={0} className={classes.contentTasks}>
                <Typography gutterBottom style={{padding: '15px 20px 5px 20px'}} component="h3">
                    <strong>TASKS</strong>
                </Typography>
                {props.dataBlog
                    ? Object.values(props.dataBlog).map((item:any, index: number) => (
                    <div key={index}>
                        <Divider />
                        <CardContent style={{paddingTop: 10, paddingBottom: 10}}>
                            <div className={classes.content}>
                                <strong>0 of {item.name} </strong> {item.task}
                            </div>
                            <div className={classes.content}>
                                <BorderLinearProgress
                                    // className={classes.margin}
                                    variant="determinate"
                                    color="secondary"
                                    value={50}
                                />
                            </div>
                            <div className={classes.content}>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {item.description}
                                </Typography>
                            </div>
                            {editable && <div className={classes.content}>
                               <EditTask uuid={item.uuid}/>
                            </div>}
                        </CardContent>

                    </div>

                ))
                    :  <CardContent>
                        <Skeleton variant="rect" width={'100%'} height={168} />
                    </CardContent>
                }
                <CardActions>
                    {!editable
                       && <FormControl fullWidth >
                            <Button
                                disableElevation
                                variant="contained"
                                color="primary">
                                Pay
                            </Button>
                        </FormControl>
                    }

                </CardActions>
                <Divider />
            </Paper>
            {editable && <AddTasks/>}
        </>
    )
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
        dataBlog: state.blog.Tasks
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            // getDataBlog: (userId: string) => dispatch(getDataBlogActionCreator(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Tasks);