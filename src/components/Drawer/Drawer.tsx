import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

interface IOpening {
    open: boolean
}

export const drawerWidth = 240;
const useStyles = makeStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
})



export default function TemporaryDrawer(props: IOpening) {
    const classes = useStyles()
    const [state, setState] = React.useState(false);

    const handleDrawerClose = () => {
        setState(false)
    }

    useEffect(()=>{
        props.open && setState(true)
    },[props])


    const list = () => (
        <div
            className={classes.drawer}
            role="presentation"
        >
            <List>
                <div>1</div>
            </List>
            <Divider />
            <List>
            </List>
            }
        </div>
    );

    return (
        <>
            <Drawer
                onClose={handleDrawerClose}
                variant="temporary"
                open={ false }
                anchor="left"
            >
                {list()}
            </Drawer>
        </>
    );
}
