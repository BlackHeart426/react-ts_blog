import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {Avatar, Button} from '@material-ui/core';
import {AccountCircle, MenuBook} from "@material-ui/icons";
import {useStyles} from "./styles";
import DehazeIcon from '@material-ui/icons/Dehaze';
import {logoutActionCreator} from "../../store/action/authorization";
import {connect} from "react-redux";
import {AuthorizationModal} from "../../container/Authorization/AuthorizationModal";
import CreatePage from "../CreatePage";
import { useHistory } from 'react-router-dom';
import {openDrawerActionCreator} from "../../store/action/app";

function Navbar(props: any) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const history = useHistory();
    const {onDrawer} = props
    const email = localStorage.getItem('email')

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleLogout = () => {
        props.action.logout()
        handleMenuClose()
    };
    const handleOpenMyBlog = () => {
        history.push("/"+props.pageCurrentUser)
    };

    const handleDrawerOpen = () => {
        props.action.openingDrawer(true)
    };


    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleOpenMyBlog}>My blog</MenuItem>
            <MenuItem onClick={handleMenuClose}>My income</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="fixed" color="inherit">
                <Toolbar style={{padding: 0}}>
                    <Typography className={classes.title} variant="h6" noWrap>
                        TS BLOG
                    </Typography>

                    {props.isAuthenticated
                        ? <>
                            <Button
                                startIcon={<DehazeIcon/>}
                                onClick={handleDrawerOpen}
                                variant="outlined">
                                <strong>My subscribers</strong>
                            </Button>
                            <div className={classes.grow} />
                            <div>
                                {/*add cookies*/}
                                {!props.pageCurrentUser && <CreatePage/>}
                            </div>
                            <div className={classes.account} >
                                <Button
                                    size="medium"
                                    startIcon={<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />}
                                    onClick={handleProfileMenuOpen}
                                >
                                    {email}
                                </Button>

                            </div>
                        </>
                        :
                        <>
                            <div className={classes.grow} />
                            <div className={classes.menuButton}>
                                <AuthorizationModal register={true}/>
                            </div>
                            <div className={classes.menuButton}>
                                <AuthorizationModal login={true} />
                            </div>

                        </>
                    }
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}
function mapStateToProps(state: any) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        pageCurrentUser: state.currentUser.myPage,
        openDrawer: state.app.openDrawer
    }

}


function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            logout: () => dispatch(logoutActionCreator()),
            openingDrawer: (open: any) => dispatch(openDrawerActionCreator(open))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
