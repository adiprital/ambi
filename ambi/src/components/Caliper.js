import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Hidden from '@mui/material/Hidden';
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import AddToCart from './AddToCart';

import rightHandedCaliber from '../assets/right-handed-caliber.jpg';
import leftHandedCaliber from '../assets/left-handed-caliber.jpg';

const useStyles = makeStyles(theme => ({
    arrowIcon: {
        color: theme.palette.common.green,
        marginTop: '0.5em',
        marginLeft: '2.5em',
        marginRight: '5em',
    },
    arrowContainer: {
        '&:hover': {
            backgroundColor: 'transparent'
        }
    },
    rowContainer: {
        paddingLeft: '5em',
        paddingRight: '5em',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '1.5em',
            paddingRight: '1.5em',
        }
    },
    cardContainer: {
        position: 'center',
        backgroundColor: 'transparent',
        boxShadow: theme.shadows[10],
        borderRadius: 15,
        padding: '10em',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '8em',
            paddingBottom: '8em',
            paddingLeft: 0,
            paddingRight: 0,
            borderRadius: 0,
            width: '100%'
        }
    },
    caliperImage: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }
}));

export default function Caliper(props) {
    const classes = useStyles();
    const theme = useTheme();
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    // const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
    // const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Grid container direction='column'>
            <Hidden mdDown>
                <Box
                    sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width:'100%'}}
                 >
                    <ArrowBackIcon
                        className={classes.arrowIcon}
                        onClick={() => navigate("/products")}
                    />
                    <ArrowForwardIcon
                        className={classes.arrowIcon}
                        onClick={() => navigate("/measuretape")}
                    />
                </Box>
            </Hidden>
            <Grid item container direction='row' className={classes.rowContainer}>
                <Grid item container direction='column'>
                    <Grid item>
                        <Typography align='center' variant='h2'>Caliper</Typography>
                    </Grid>
                </Grid>
                {/*-----Ambi's Caliber Card----- */}
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>

                    <CardMedia
                        className={classes.caliperImage}
                        component='img'
                        image={leftHandedCaliber}
                        alt='left handed caliber'
                    />
                    <CardContent>
                        <Typography align='center' gutterBottom variant='h2'>
                            Ambi's Caliber
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='body2' paragraph>
                            <p dir='rtl'>
                                *****אין לי סבלנות להתחיל לחפש את קבצי ההדמיה.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='body2' paragraph>
                            <p dir='rtl'>
                                השינוי:<br />
                                הוספת מספרים בצד השני, כך שאפשר למדוד בשתי הידיים.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='body2' paragraph>
                            <p dir='rtl'>
                                הקליבר עשוי נירוסטה ופלסטיק.
                                מיוצר על ידי - חיתוכי לייזר, עיבוד שבבי, הדפסת  UV והזרקת פלסטיק.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='body2' paragraph>
                            <p dir='rtl'>
                                לוגו מיוצר על ידי צריבה.
                            </p>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <AddToCart productName={props.productName}/>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};