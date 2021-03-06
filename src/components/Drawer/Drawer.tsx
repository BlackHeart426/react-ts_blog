import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import {connect} from "react-redux";
import {IReduxOpenDrawerAction, openDrawerActionCreator} from "../../store/action/app";
import {ListItem, ListItemText, ListItemIcon, Avatar, Grid} from '@material-ui/core';
import {useHistory} from "react-router-dom";
import {AppState} from "../../store/reducers/rootReducer";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';

export const drawerWidth = 240;

const useStyles = makeStyles({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
})

const TemporaryDrawer: React.FC<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> = ({
    openDrawer,
    subscriptions,
    openDrawerActionCreator
}) => {
    const classes = useStyles()
    const history = useHistory()

    const handleDrawerClose = () => {
        openDrawerActionCreator()
    }

    const handleOpenBlog = (blog: string) => {
        history.push("/" + blog)
        openDrawerActionCreator()
    }

    const list = () => (
        <div
            className={classes.drawer}
            role="presentation"
        >
            <List >
            {subscriptions && Object.values(subscriptions).map((item:any, index: number) => (
                <ListItem button key={index} onClick={() => handleOpenBlog(item.name)}>
                    <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary={item.name} >
                        {item.name}
                    </ListItemText>
                </ListItem>
            ))}
            </List>
        </div>
    );

    return (
        <>
            <Drawer
                onClose={handleDrawerClose}
                variant="temporary"
                open={ openDrawer }
                anchor="left"
            >
                {list()}
            </Drawer>
        </>
    );
}

function mapStateToProps(state: AppState) {
    return {
        openDrawer: state.app.openDrawer,
        subscriptions: state.currentUser.subscriptions,
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IReduxOpenDrawerAction>) =>
    bindActionCreators( { openDrawerActionCreator }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps) (TemporaryDrawer);
