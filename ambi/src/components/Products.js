import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

import leftHandIcon from '../assets/noun-left-handed-icon.png';

const useStyles = makeStyles(theme => ({
    subtitle: {
        marginBottom: '1em'
    },
    icon: {
        marginLeft: '2em',
        width: '8em',
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            width: '6em'
        }
    },
    productsContainer: {
        marginTop: '10em',
        [theme.breakpoints.down('sm')]: {
            padding: 25
        }
    },
    learnButton: {
        borderColor: '#A7D9D4',
        color: '#A7D9D4',
        borderWidth: 2,
        textTransform: 'none',
        borderRadius: 50,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        fontSize: '0.7rem',
        height: 35,
        padding: 5,
        [theme.breakpoints.down('sm')]: {
            marginBottom: '2em'
        }
    }
}));



export default function Products(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <Grid container direction='column'>
            <Grid
                item
                style={{marginLeft: matchesSM ? 0 : '5em',
                        marginTop: matchesSM ? '1em' : '2em'}}
            >
                <Typography
                    variant='h2'
                    align='center'
                    gutterBottom
                >Products</Typography>
            </Grid>
            <Grid item> {/*-----Caliper Block----- */}
                <Grid
                    container
                    direction='row'
                    justifyContent={matchesSM ? 'center' : 'flex-end'}
                    className={classes.productsContainer}
                    style={{marginTop: matchesSM ? '1em' : '5em',
                            marginRight: matchesSM ? '1em' : '5em',
                            marginBottom: matchesSM ? '2em' : '3em'}}
                >
                    <Grid
                        item
                        style={{textAlign: matchesSM ? 'center' : 'right',
                                width: matchesSM ? undefined : '35em'}}
                    >
                        <Typography variant='h4'>Caliper</Typography>
                        <Typography
                            variant='subtitle1'
                            className={classes.subtitle}
                        >
                            <p dir='rtl'>
                                השינוי:<br />
                                הוספת מספרים בצד השני.<br />
                                אם אני כותבת עוד שטויות אז האייקון מסתדר....?<br />
                                כן. הוא מסתדר. זה תלוי כמה מלל יש לי פה.<br />
                                נצטרך לשנות את זה שהמיקום יהיה קבוע בלי קשר לכמות המלל שיש פה.<br />
                                אולי נסדר את זה אחרי שנשים את כל הנתונים במערך של גייסון.
                            </p>
                        </Typography>
                        <Button
                            component={Link}
                            to='/caliper'
                            variant='outlined'
                            className={classes.learnButton}
                            onClick={() => {props.setValue(1); props.setSelectedIndex(2)}}
                            style={{marginBottom: matchesSM ? '1em' : '5em'}}
                        >
                            <span>Learn More</span>
                        </Button>
                    </Grid>
                    <Grid
                        item
                        style={{marginRight: matchesSM ? 0 : '5em'}}
                    >
                        <img className={classes.icon} alt='left hand' src={leftHandIcon} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item> {/*-----Measure Tape Block----- */}
                <Grid
                    container
                    direction='row'
                    justifyContent={matchesSM ? 'center' : undefined}
                    className={classes.productsContainer}
                    style={{marginTop: matchesSM ? '1em' : '5em',
                            marginRight: matchesSM ? '1em' : '5em',
                            marginBottom: matchesSM ? '2em' : '3em'}}
                >
                    <Grid
                       item
                       style={{marginLeft: matchesSM ? 0 : '5em',
                               textAlign: matchesSM ? 'center' : 'right'}}
                    >
                        <Typography variant='h4'>Measure Tape</Typography>
                        <Typography
                            variant='subtitle1'
                            className={classes.subtitle}
                        >
                            <p dir='rtl'>
                                השינוי:<br />
                                סיבוב כיוון המספרים כך שאין צד דומיננטי לכיוון המספרים.
                            </p>
                        </Typography>
                        <Button
                            component={Link}
                            to='/measuretape'
                            variant='outlined'
                            className={classes.learnButton}
                            onClick={() => {props.setValue(1); props.setSelectedIndex(2)}}
                            style={{marginBottom: matchesSM ? '1em' : '5em'}}
                        >
                            <span>Learn More</span>
                        </Button>
                    </Grid>
                    <Grid item style={{marginRight: matchesSM ? 0 : '5em'}}>
                        <img className={classes.icon} alt='left hand' src={leftHandIcon} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item> {/*-----Ruler Tape Block----- */}
                <Grid
                    container
                    direction='row'
                    justifyContent={matchesSM ? 'center' : 'flex-end'}
                    className={classes.productsContainer}
                    style={{marginTop: matchesSM ? '1em' : '5em',
                            marginRight: matchesSM ? '1em' : '5em',
                            marginBottom: matchesSM ? '2em' : '3em'}}
                >
                    <Grid
                        item
                        style={{textAlign: matchesSM ? 'center' : 'right',
                                width: matchesSM ? undefined : '35em'}}
                    >
                        <Typography variant='h4'>Ruler</Typography>
                        <Typography
                            variant='subtitle1'
                            className={classes.subtitle}
                        >
                            <p dir='rtl'>
                                השינוי:<br />
                                הוספת מספרים בשני הצדדים וציר גמיש שיודע לזוז בהתאם למשתמש.
                            </p>
                        </Typography>
                        <Button
                            component={Link}
                            to='/ruler'
                            variant='outlined'
                            className={classes.learnButton}
                            onClick={() => {props.setValue(1); props.setSelectedIndex(2)}}
                            style={{marginBottom: matchesSM ? '1em' : '5em'}}
                        >
                            <span>Learn More</span>
                        </Button>
                    </Grid>
                    <Grid item style={{marginRight: matchesSM ? 0 : '5em'}}>
                        <img className={classes.icon} alt='left hand' src={leftHandIcon} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item> {/*-----Scissors Block----- */}
                <Grid
                    container
                    direction='row'
                    justifyContent={matchesSM ? 'center' : undefined}
                    className={classes.productsContainer}
                    style={{marginTop: matchesSM ? '1em' : '5em',
                            marginRight: matchesSM ? '1em' : '5em',
                            marginBottom: matchesSM ? '2em' : '3em'}}
                >
                    <Grid
                       item
                       style={{marginLeft: matchesSM ? 0 : '5em',
                               textAlign: matchesSM ? 'center' : 'right'}}
                    >
                        <Typography variant='h4'>Scissors</Typography>
                        <Typography
                            variant='subtitle1'
                            className={classes.subtitle}
                        >
                            <p dir='rtl'>
                                השינוי:<br />
                                הוספת להב המאפשר לחתוך ללא הסתרה של הדבר אותו חותכים.
                            </p>
                        </Typography>
                        <Button
                            component={Link}
                            to='/scissors'
                            variant='outlined'
                            className={classes.learnButton}
                            onClick={() => {props.setValue(1); props.setSelectedIndex(2)}}
                            style={{marginBottom: matchesSM ? '1em' : '5em'}}
                        >
                            <span>Learn More</span>
                        </Button>
                    </Grid>
                    <Grid item style={{marginRight: matchesSM ? 0 : '5em'}}>
                        <img className={classes.icon} alt='left hand' src={leftHandIcon} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item> {/*-----Utility Knife Block----- */}
                <Grid
                    container
                    direction='row'
                    justifyContent={matchesSM ? 'center' : 'flex-end'}
                    className={classes.productsContainer}
                    style={{marginTop: matchesSM ? '1em' : '5em',
                            marginRight: matchesSM ? '1em' : '5em',
                            marginBottom: matchesSM ? '2em' : '3em'}}
                >
                    <Grid
                        item
                        style={{textAlign: matchesSM ? 'center' : 'right',
                                width: matchesSM ? undefined : '35em'}}
                    >
                        <Typography variant='h4'>Utility Knife</Typography>
                        <Typography
                            variant='subtitle1'
                            className={classes.subtitle}
                        >
                            <p dir='rtl'>
                                השינוי:<br />
                                הזזת מיקום מנגנון ההפעלה כלפי מעלה שגורם להזזת הכפתור באמצעות
                                האצבע במקום האגודל ומייצר סימטריה שמתאימה לשני המשתמשים.
                            </p>
                        </Typography>
                        <Button
                            component={Link}
                            to='/knife'
                            variant='outlined'
                            className={classes.learnButton}
                            onClick={() => {props.setValue(1); props.setSelectedIndex(2)}}
                            style={{marginBottom: matchesSM ? '1em' : '5em'}}
                        >
                            <span>Learn More</span>
                        </Button>
                    </Grid>
                    <Grid
                        item
                        style={{marginRight: matchesSM ? 0 : '5em'}}
                    >
                        <img className={classes.icon} alt='left hand' src={leftHandIcon} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};