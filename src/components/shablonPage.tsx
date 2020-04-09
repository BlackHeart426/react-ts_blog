import React from "react";
import {useParams} from "react-router";
import { AvatarUser } from "../components/AvatarUser";
import {ReactComponent} from "*.svg";
import {CoverContent} from "../components/CoverContent";
import {AboutUserCard} from "../components/AboutUserCard";
import {LevelSubscribe} from "../components/LevelSubscribe";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, Paper} from "@material-ui/core";

interface ParamTypes {
    userId: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backgroundImage: {
            position: 'relative',
            width: '100%',
            height: '310px',
            top: '0',
            left: '0',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: "url(https://firebasestorage.googleapis.com/v0/b/ts-blog-45eb9.appspot.com/o/logo%2Fbackground_065.jpg?alt=media&token=7c4b3ee2-9e75-42f2-97ab-5f17c5b31989)",
        },
        layout : {
            // position: 'relative',
            minWidth: '1240px',
            flex: '1',
        },
        content : {
            marginTop: '15px',
            width: '1240px',
            margin: '0 auto',
            paddingBottom: '20px'
        },
        contentInfo : {
            width: '1240px',
            margin: '0 auto',
            paddingBottom: '20px',
            paddingTop: '235px',

            color: 'white'
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },

        })
)

export const ShablonPage: React.FC = () => {
    const {userId} = useParams<ParamTypes>()
    const classes = useStyles()
    return (
        <>
            <div className={classes.layout}>
                <div className={classes.backgroundImage}>
                    <div className={classes.contentInfo}>
                        <CoverContent/>
                    </div>

                </div>
                <div className={classes.content}>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <AvatarUser/>
                        </Grid>
                        <Grid item xs={6}>
                            <AboutUserCard/>
                        </Grid>
                        <Grid item xs={3}>
                            <LevelSubscribe />
                        </Grid>
                    </Grid>

                    <div className="row">
                        <div className="col s3 plAvatar">
                            {/*<AvatarUser/>*/}
                        </div>
                        <div className="col s6">
                            {/*<AboutUserCard/>*/}
                        </div>
                        <div className="col s3">
                            {/*<LevelSubscribe/>*/}
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}