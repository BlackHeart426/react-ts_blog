import React from "react";
import {Card, CardContent, Divider, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import SettingsIcon from '@material-ui/icons/Settings';
import {Visibility, VisibilityOff} from "@material-ui/icons";

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

export const listPosts = [
    {
        date: "14.04.2020 в 11:27",
        uuid: '293642-31s5f1s6-df16238',
        tier: [],
        title: 'test1',
        content: {img: ''},
        description: "Access to the show ",
        comment: [],
        like: 2
    },
    {
        name: "12.04.2020 в 11:27",
        uuid: 'f6543-2615564-f16238',
        tier: [],
        title: 'test',
        content: {video: ''},
        description: "All videos",
        comment: [],
        like: 10
    },
]

export const Posts: React.FC = (props: any) => {
    const {editable = true} = props
    const classes = useStyles()
    return (
        <Paper elevation={0}  style={{marginTop: 20}}>
            <Grid container spacing={3} style={{margin: 0, marginRight: 20}}>
                <Typography gutterBottom style={{padding: '15px 20px 5px 20px'}} component="h3">
                    08 апреля в 11:27
                </Typography>
                <div className={classes.grow} />
                {editable && <IconButton
                    style={{marginRight: 25}}
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}

                >
                    <SettingsIcon/>
                </IconButton>
                }
            </Grid>

            <Divider />
            <CardContent>


                <Typography component="p" className={classes.contentAbout}>
                    Subscribers
                </Typography>
            </CardContent>
            <Divider />
            <CardContent>

            </CardContent>
        </Paper>
    )
}