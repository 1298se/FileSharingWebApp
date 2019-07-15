import { IconButton } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar"
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import * as auth from "../../../utils/firebase/auth-utils";
import SnackbarContentWrapper from "../../feedback/snackbar-content-wrapper/SnackbarContentWrapper";
import styles from "./appBarStyles";
import { IMainAppBarProps, IMainAppBarState } from "./mainAppBar.type";

// TODO: Currently, it logs the user out because the authStateChangedListener responds to network failure
// and redirects the user to login. Needs to be changed to redirect back to login page AFTER
// logout is complete (e.g.) do not let a redux state update if the user disconnects from WIFI
class MainAppBar extends Component<IMainAppBarProps, IMainAppBarState> {
    public state = {
        anchorEl: null,
        logoutRequestError: null,
        shouldDisplayError: false,
    };

    public handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    }

    public handleMenuClose = () => {
        this.setState({
            anchorEl: null,
        });
    }

    public handleLogoutClick = () => {
        // TODO: Handle Errors
        this.handleMenuClose();
        auth.logoutUser()
        .then(() => {
            this.setState({
                logoutRequestError: null,
                shouldDisplayError: false,
            });
        }).catch((error) => {
            this.setState({
                logoutRequestError: error,
                shouldDisplayError: true,
            });
        });
    }

    // This function is to handle a bug where the error message of the snackbar
    // changes during exit transition. This function handles closing the snackbar
    public handleErrorClose = () => {
        this.setState({
            shouldDisplayError: false,
        });
    }

    // This function is to handle a bug where the error message of the snackbar
    // changes during exit transition. This function resets the logoutRequestError to null
    // after the transition has been completed.
    public clearLogoutRequestError = () => {
        this.setState({
            logoutRequestError: null,
        });
    }

    public render() {
        const { classes } = this.props;

        const userMenu = (
            <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted={true}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(this.state.anchorEl)}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
                <MenuItem onClick={this.handleLogoutClick}>Logout</MenuItem>
            </Menu>
        );

        return (
            <React.Fragment>
                <Snackbar
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    open={this.state.shouldDisplayError}
                    onClose={this.handleErrorClose}
                    onExited={this.clearLogoutRequestError}
                >
                    <SnackbarContentWrapper
                        message={String(this.state.logoutRequestError)}
                        variant="error"
                        onClose={this.handleErrorClose}
                    />
                </Snackbar>
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.drawerButton} color="inherit" >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.appBarTitle} variant="h6" noWrap={true}>
                            Contrail Web
                    </Typography>
                        <IconButton edge="end" color="inherit" onClick={this.handleMenuOpen}>
                            <AccountCircle />
                        </IconButton>
                    </Toolbar>
                    {userMenu}
                </AppBar>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(MainAppBar);
