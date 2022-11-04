import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';

const useStyles = makeStyles(theme => ({
    textContainer: {
        paddingLeft: '5em',
        paddingRight: '5em',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '1.5em',
            paddingRight: '1.5em',
        }
    }
}));

export default function HomePage(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card variant='tabs-container'>
            <Grid container direction='column'>
                <Grid item container direction='row' className={classes.textContainer}>
                    <Grid item container direction='column'>
                        <Grid item>
                            <Typography align='center' variant='h2'>Ambi</Typography>
                        </Grid>
                        <Grid item style={{marginLeft: matchesSM ? 0 : '5em',
                                        textAlign: matchesSM ? 'center' : undefined}}
                        >
                            <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1' paragraph>
                                <p dir='rtl'>
                                    עוסק בכלים אמבידקסטרים - לימניים ושמאליים כאחד.
                                </p>
                            </Typography>
                            <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1' paragraph>
                                <p dir='rtl'>
                                    עיצוב כלים אמבידקסטרים המתאימים לשימוש של שמאליים וימניים.
                                </p>
                            </Typography>
                            <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1' paragraph>
                                <p dir='rtl'>
                                אז מה זה בעצם Ambi? <br />
                                מגיע מהמונח אמבידקסטרי שזאת הגדרה לאדם השולט בשתי ידיו במידה שווה, בלי צד דומיננטי.
                                </p>
                            </Typography>
                            <Button
                                component={Link}
                                to='/about'
                                variant='outlined'
                                style={{marginBottom: matchesSM ? '1em' : '5em'}}
                            >
                                <span>About us</span>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>

    );
};