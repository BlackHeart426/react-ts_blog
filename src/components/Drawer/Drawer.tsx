import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import {autoLoginActionCreator} from "../../store/action/authorization";
import {connect} from "react-redux";
import {openDrawerActionCreator} from "../../store/action/app";

export const drawerWidth = 240;
const useStyles = makeStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
})

function TemporaryDrawer(props: any) {
    const classes = useStyles()

    const handleDrawerClose = () => {
        props.action.openingDrawer(false)
    }

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
                open={ props.openDrawer }
                anchor="left"
            >
                {list()}
            </Drawer>
        </>
    );
}

function mapStateToProps(state: any) {
    return {
        openDrawer: state.app.openDrawer
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            openingDrawer: (open: any) => dispatch(openDrawerActionCreator(open))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (TemporaryDrawer);
