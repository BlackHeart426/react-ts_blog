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
export function AboutUserCard(props: any){
    const {editable = false} = props
    const classes = useStyles()
    return (
        <Paper elevation={0}  >
            <Grid container spacing={3} style={{margin: 0, marginRight: 20}}>
                <Typography gutterBottom style={{padding: '15px 20px 5px 20px'}} component="h3">
                    <strong>ABOUT USER</strong>
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
        </Paper>
    )
}