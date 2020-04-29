import React, {useEffect, useState} from "react";
import {Typography,  InputAdornment, Input} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import {getDataBlogActionCreator, updateDataBlogActionCreator} from "../../store/action/blog";
import {connect} from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import {useParams} from "react-router";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            contentInfoTitle: {
                marginLeft: '292px',
                paddingLeft: '25px'
            }
        }
    )
)

interface ParamTypes {
    userId: string
}

function CoverContent(props: any) {
    const {editable} = props
    const classes = useStyles();
    const {userId} = useParams<ParamTypes>();
    const [value, setValue] = useState('')

    useEffect(()=>{
        setValue(props.dataBlogDescription.about)
    },[props.dataBlogDescription.about])

    const handleSaveData = (e: any) => {
        setValue(e.currentTarget.value)
        const value = {
            name: userId,
            about: e.currentTarget.value
        }
        props.action.updateDataBlog(e.currentTarget.name, value)
    };

    return (
        <div className={classes.contentInfoTitle}>
            <Typography gutterBottom variant="h3" component="h2">
                {props.dataBlogDescription
                    ? props.dataBlogDescription.name
                    : <Skeleton variant="text" width={100}/>
                }
            </Typography>
            {editable
                ?
                <Input
                style={{color: '#fff', fontSize: 25, width: '60%'}}
                endAdornment={<EditIcon/>}
                onChange={handleSaveData}
                fullWidth
                type={"text"}
                color={"secondary"}
                value={value ? value : ''}
                name={'Description'}
                inputProps={{'aria-label': 'naked'}}/>
                : <Typography gutterBottom variant="h5" component="h2">
                    {props.dataBlogDescription.about}
                </Typography>
            }
        </div>
    )
}

function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        isMyPage: state.currentUser.myPage,
        dataBlogDescription: state.blog.Description
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            updateDataBlog: (nameColumn: string, value: any) => dispatch(updateDataBlogActionCreator(nameColumn, value))
            // getDataBlog: (userId: string) => dispatch(getDataBlogActionCreator(userId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (CoverContent);