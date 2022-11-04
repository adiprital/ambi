import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import AddToCart from './AddToCart';
import ArrowIcon from './ArrowIcon';

import caliper1 from '../assets/Caliper1.jpg';
import caliper2 from '../assets/Caliper2.jpg';

const useStyles = makeStyles(theme => ({
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
        backgroundRepeat: 'no-repeat',
        marginBottom: '20px'
    }
}));

export default function Caliper(props) {
    const classes = useStyles();
    const theme = useTheme();

    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Grid container direction='column'>
            <ArrowIcon productName={props.productName}/>
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
                        image={caliper1}
                        alt='caliper1'
                    />
                    <CardMedia
                        className={classes.caliperImage}
                        component='img'
                        image={caliper2}
                        alt='caliper2'
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