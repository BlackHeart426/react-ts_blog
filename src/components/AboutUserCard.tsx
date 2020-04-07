import React from "react";
import {Button, Card, CardActions, CardContent, CardMedia, Divider, FormControl, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
            contentAbout: {
                marginTop: '10px'
            }
        }
    )
)
export const AboutUserCard: React.FC = () => {
    const classes = useStyles()
    return (
        <Card >
            <CardContent>
                <Typography gutterBottom variant="h6" component="h2">
                    ABOUT USER
                </Typography>
                <Divider />
                <Typography component="p" className={classes.contentAbout}>
                    Subscribers
                </Typography>
            </CardContent>
        </Card>
    )
}