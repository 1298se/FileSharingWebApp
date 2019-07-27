import { withStyles } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";
import { borders } from "@material-ui/system";
import React, { Component } from "react";
import ResourceListView from "../../resources/resource-list-view/ResourceListView";
import MainToolBar from "../main-tool-bar/MainToolBar";
import styles from "../mainStyles";

class MainView extends Component<any, any> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container className={classes.container}>
                    <MainToolBar />
                    <div className={classes.appBarSpacer} />
                    <ResourceListView />
                </Container>
            </div>
        );
    }
}
export default withStyles(styles)(MainView);
