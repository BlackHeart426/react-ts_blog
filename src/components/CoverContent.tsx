import React from "react";
import {Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            contentInfoTitle: {
                marginLeft: '292px',
                paddingLeft: '25px'
            }
        }
    )
)

export const CoverContent: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.contentInfoTitle}>
            <Typography gutterBottom variant="h5" component="h2">
                BlackHear
            </Typography>
            <Typography gutterBottom  component="h2">
                Edit description
            </Typography>
        </div>
    )
}