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
import {getDataBlogActionCreator} from "../../store/action/blog";
import {connect} from "react-redux";

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


export const listTasks = [
    {
        cost: "0 of 500",
        name: 'платных подписчиков',
        description: "Access to the show ",
        active: true
    },
    {
        cost: "0 of 500 ₽",
        name: "собрано",
        description: "All videos",
        active: false
    }
]


//editable: boolean
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

                {listTasks.map((item:{name: string, cost: string, description: string, active: boolean}, index: number) => (
                    <div key={index}>
                        <Divider />
                        <CardContent style={{paddingTop: 10, paddingBottom: 10}}>
                            <div className={classes.content}>
                                <Typography >
                                    {item.cost} {item.name}
                                </Typography>
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
                                <Typography variant="body2" color="textSecondary" component="p" >
                                    <Link href="#" variant="body2">
                                        Edit
                                    </Link>
                                </Typography>
                            </div>}
                        </CardContent>

                    </div>

                ))}
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
            {editable && <FormControl fullWidth style={{marginTop: 20}}>
                <Button
                    disableElevation
                    variant="contained"
                    color="primary">
                    <strong>Add TAsks</strong>
                </Button>
            </FormControl>}
        </>
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

export default connect(mapStateToProps, mapDispatchToProps) (Tasks);