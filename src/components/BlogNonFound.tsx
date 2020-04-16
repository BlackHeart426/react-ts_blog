import React from "react";
import {Button, createStyles, makeStyles, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import {useParams} from "react-router";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            width: 500,
            padding: '50px 0',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            margin: '0 auto',
            textAlign: 'center',
        },
        title : {

        },
        image : {
            margin: 50
        },
        description: {

        },
        button: {
            marginTop: 30
        }
    }),
);

interface ParamTypes {
    userId: string
}

export function BlogNonFound(props: any) {
    const {userId} = useParams<ParamTypes>();
    const history = useHistory()
    const classes = useStyles()

    const handleOpenHome = () => {
        history.push("/")
    }

    return (
        <div className={classes.container}>
            <div className={classes.image}>
                <img
                    width={200}
                    height={200}
                    src={"https://firebasestorage.googleapis.com/v0/b/ts-blog-45eb9.appspot.com/o/problem.png?alt=media&token=9b5a1086-0bc6-4a82-b242-4a527851d7b2"}
                >

                </img>
            </div>
            <Typography className={classes.title} variant="h4" noWrap>
                Blog no found
            </Typography>
            <Typography className={classes.description}  color="textSecondary"  noWrap>
                Sorry, the "<strong>{userId}</strong>" blog you requested was not found.
            </Typography>
            <Button
                className={classes.button}
                disableElevation
                variant="contained"
                onClick={handleOpenHome}
                color="primary">
                <strong>Home</strong>
            </Button>
        </div>

    )
}