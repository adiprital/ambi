import React from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom';
import Hidden from '@mui/material/Hidden';


const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.common.green,
        color: theme.palette.common.white,
        fontFamily: 'Arial',
        width: '100%',
        zIndex: 1302,
        position: 'relative'
    },
    mainContainer: {
        backgroundColor: theme.palette.common.green,
        position: 'static'
    },
    link: {
        color: theme.palette.common.white,
        fontSize: '0.75rem',
        fontWeight: 'bold',
        textDecoration: 'none'
    },
    gridItem: {
        margin: '3em'
    }
}));

export default function Footer(props) {
    const classes = useStyles();

    return(
        <footer className={classes.footer}>
            <Hidden mdDown>
                <Grid
                    container
                    justifyContent='center'
                    className={classes.mainContainer}
                    columnSpacing={10}
                    rowSpacing={2}
                >
                    <Grid item className={classes.gridItem}>
                        <Grid container direction='column' spacing={2}>
                            <Grid
                                item
                                component={Link}
                                onClick={() => props.setValue(0)}
                                to='/'
                                className={classes.link}
                            >Home</Grid>
                            <Grid
                                item
                                component={Link}
                                onClick={() => {props.setValue(1); props.setSelectedIndex(0)}}
                                to='/about'
                                className={classes.link}
                            >About Us</Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction='column' spacing={2}>
                            <Grid
                                item
                                component={Link}
                                onClick={() => {props.setValue(1); props.setSelectedIndex(0)}}
                                to='/products'
                                className={classes.link}
                            >Products</Grid>
                            <Grid
                                item
                                component={Link}
                                onClick={() => {props.setValue(1); props.setSelectedIndex(1)}}
                                to='/caliper'
                                className={classes.link}
                            >Caliper</Grid>
                            <Grid
                                item
                                component={Link}
                                onClick={() => {props.setValue(1); props.setSelectedIndex(2)}}
                                to='/measuretape'
                                className={classes.link}
                            >Measure Tape</Grid>
                            <Grid
                                item
                                component={Link}
                                onClick={() => {props.setValue(1); props.setSelectedIndex(3)}}
                                to='/ruler'
                                className={classes.link}
                            >Ruler</Grid>
                            <Grid
                                item
                                component={Link}
                                onClick={() => {props.setValue(1); props.setSelectedIndex(4)}}
                                to='/scissors'
                                className={classes.link}
                            >Scissors</Grid>
                            <Grid
                                item
                                component={Link}
                                onClick={() => {props.setValue(1); props.setSelectedIndex(5)}}
                                to='/utilityknife'
                                className={classes.link}
                            >Utility Knife</Grid>
                        </Grid>
                    </Grid>
                    <Grid item className={classes.gridItem}>
                        <Grid container direction='column' spacing={2}>
                            <Grid
                                item
                                component={Link}
                                onClick={() => {props.setValue(1); props.setSelectedIndex(2)}}
                                to='/contact'
                                className={classes.link}
                            >Contact Us</Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Hidden>
            <Grid
                    container
                    justifyContent='left'
                    rowSpacing={2}
                >
                    <Grid
                        item
                        className={classes.link}
                        component={'a'}
                        href='https://www.linkedin.com/in/adi-pri-tal-3829521b3/'
                        rel='development'
                        target='_blank'
                    >© Adi Pri-Tal's Development 2022</Grid>
            </Grid>
        </footer>
    );
};