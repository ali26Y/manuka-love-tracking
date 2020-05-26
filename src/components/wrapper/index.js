/* eslint-disable react/jsx-no-comment-textnodes */
import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Grid } from '@material-ui/core';
import logo from '../../assets/manuka-love-logo-large-alt.png';

import Styled from './styles';

const ElevateAppBar = props => {
    const { children } = props;
    return (
        <Styled>
            {({ classes }) => (
                <Fragment>
                    <div className={classes.root}>
                        <AppBar className={classes.appBar}>
                            <Container maxWidth="xl">
                                <Toolbar>
                                    <div className={classes.menuContainer}>
                                        <Typography variant="h6" className={`${classes.header} ${classes.leftHeader}`}>
                                            <a href="https://www.manukalove.co.nz/collections/manuka-love">Shop</a>
                                        </Typography>
                                        <img className={classes.logo} src={logo} alt="Logo" />
                                        <Typography variant="h6" className={`${classes.header} ${classes.rightHeader}`}>
                                            <span>Tracking</span>
                                        </Typography>
                                    </div>
                                </Toolbar>
                            </Container>
                        </AppBar>
                        <div className={classes.hero}></div>
                        <Container className={classes.pageContainer} maxWidth="lg">
                            <Paper>{children}</Paper>
                        </Container>
                        <div className={classes.footer}>
                            <Container maxWidth="lg">
                                <Grid container spacing={3}>
                                    <a className={classes.mainItem} href="https://www.manukalove.co.nz/collections/manuka-love">
                                        Copyright © 2020 Manuka Love
                                    </a>
                                </Grid>
                            </Container>
                        </div>
                    </div>
                </Fragment>
            )}
        </Styled>
    );
};

export default ElevateAppBar;
