import React, {useEffect} from "react";
import { Backdrop, CircularProgress, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

export function Loading(props: any) {
    const {show} = props
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        setOpen(true);
    },[show])


    return <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
    </Backdrop>
}