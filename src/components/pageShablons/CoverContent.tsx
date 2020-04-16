import React from "react";
import {Typography, InputBase, InputAdornment} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import {getDataBlogActionCreator} from "../../store/action/blog";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            contentInfoTitle: {
                marginLeft: '292px',
                paddingLeft: '25px'
            }
        }
    )
)

export const CoverContent: React.FC = (props: any) => {
    const {editable } = props
    const classes = useStyles();
    return (
        <div className={classes.contentInfoTitle}>
            <Typography gutterBottom variant="h3" component="h2">
                {props.dataBlogDescription
                    ? props.dataBlogDescription.name
                    : <Skeleton variant="text" width={100}/>
                }
            </Typography>
            {editable
                ? <InputBase
                style={{color: '#fff', fontSize: 25, width: '60%'}}
                endAdornment={<EditIcon/>}
                fullWidth
                defaultValue="Edit description"
                inputProps={{'aria-label': 'naked'}}
                />
                : <Typography gutterBottom variant="h5" component="h2">
                    Edit description
                </Typography>
            }
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
        dataBlogDescription: state.blog.dataBlog.Description
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            getDataBlog: (userId: string) => dispatch(getDataBlogActionCreator(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CoverContent);