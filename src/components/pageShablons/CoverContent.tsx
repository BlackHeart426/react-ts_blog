import React from "react";
import {Typography, InputBase, InputAdornment} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';

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
    const {editable = false} = props
    const classes = useStyles();
    return (
        <div className={classes.contentInfoTitle}>
            <Typography gutterBottom variant="h3" component="h2">
                BlackHear
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