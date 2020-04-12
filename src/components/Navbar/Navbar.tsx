import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Button } from '@material-ui/core';
import {AccountCircle, MenuBook} from "@material-ui/icons";
import {useStyles} from "./styles";
import Login from "../Login";
import SignUp from "../SignUp";
import {logoutActionCreator} from "../../store/action/authorization";
import {connect} from "react-redux";
import {AuthorizationModal} from "../../container/Authorization/AuthorizationModal";

function Navbar(props: any) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        TS BLOG
                    </Typography>

                    {props.isAuthenticated
                        ? <>
                            <Button
                                startIcon={<MenuBook/>}
                                variant="outlined">
                                My subscribers
                            </Button>
                            <div className={classes.grow} />
                            <div>
                                <Button  variant="outlined">Create Page</Button>
                            </div>
                            <div >
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <AccountCircle />

                                </IconButton>
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
        isAuthenticated: state.auth.isAuthenticated
    }

}


function mapDispatchToProps(dispatch: any) {
    return {
        action: {
            logout: () => dispatch(logoutActionCreator())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
