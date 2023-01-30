import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
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
    },
    learnButton: {
        height: 35,
        '&:hover': {
            backgroundColor: theme.palette.secondary.light
        },
        [theme.breakpoints.down('sm')]: {
            marginBottom: '2em'
        }
    }
}));

export default function About(props) {
    const classes = useStyles();
    const theme = useTheme();
    let navigate = useNavigate();
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'));
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Grid container direction='column'>
            <Grid item container direction='row' className={classes.textContainer}>
                <Grid item container direction='column'>
                    <Grid item>
                        <Typography align='center' variant='h2'>About Us</Typography>
                    </Grid>
                    <Grid item style={{marginLeft: matchesSM ? 0 : '5em',
                                       textAlign: matchesSM ? 'center' : undefined}}
                    >
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                היי אני יעל, ואני מתרגשת להציג לכם את פרויקט הגמר שלי:
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                AMBI - העוסק בכלים אמבידקסטרים - לימניים ושמאליים כאחד.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                הצורך בכלים בעיצוב מכליל מגיע בעקבות היותי שמאלית.<br />
                                מגיל צעיר, נאלצתי להתאים את עצמי לסביבה של ימניים בעיקר מחוסר מודעות,
                                אך גם מחוסר מודעות של הסביבה כלפי הצרכים של שמאליים.
                                בתור שמאלית, נתקלתי במצבים לא נעימים בהם הבנתי שאין מספיק מוצרים התואמים לשימוש נכון של שמאליים.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                התחלתי להבין יותר את העניין של להיות שמאלית בעולם של ימניים.<br />
                                כשהתחלתי לחקור יותר לעומק את הנושא של שמאליים,
                                התחלתי לשים לב לפיצול בין ימניים ושמאליים כמעט בכל סביבה:
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                בסביבה ביתית - מכשירי חשמל, ידיות של דלתות, ברזים.<br />
                                פנאי - תפעול מצלמה, מגוון כלי נגינה, שלטי גיימינג.<br />
                                ובסביבת סדנת עבודה - מגוון רחב של כלי עבודה ומהסביבה הזאת יצאתי לפרויקט.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                התחלתי לחקור מוצרים ובעצם כמעט כל המוצרים הקיימים היום בשוק מיועדים לימניים
                                ואם במידה קיימים מוצרים לשמאליים, הם יקרים משמעותית עקב חוסר בביקוש.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                דבר שגרם לכך ששמאליים "אימנו" את המוח שלהם להשתמש במוצרים המיועדים לימנים.
                                בזמן השימוש במוצרים שמיועדים לימניים - שמאליים מבצעים
                                 את הפעולה עם כלי שלא תואם להם כי האחיזה הפוכה וזה גורם לשמאלי לבצע פעולה לא נכונה.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                בעקבות סקר שערכתי בקרב שמאליים - ראיתי שיש שמאליים נוספים שגם להם
                                 מפריע שאין להם כלים שמתאימים להם וזה נתן לי תוקף לכך שהתאמת הכלים לשמאליים חשובה.<br />
                                הסקר עזר לי להבין איזה כלים הכי נחוצים להתערבות,
                                ובחרתי חמישה כלים: קליבר, מטר, סרגל, סכין ומספריים
                                הכלים מיועדים לשימוש לא מקצועי במטרה לאפשר לכלל המשתמשים להשתמש בכלים באופן אינטואיטיבי.<br />
                                 בחרתי בכלים האלה כי הם כלים קלאסיים שנמצאים בארגז הכלים של האדם הממוצע ולא פונים לבעל מקצוע ספציפי.
                                ובנוסף הם הכלים שהכי מתסכלים שמאלי בזמן השימוש בהם.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                המטרה של הפרויקט שלי היא:<br />
                                לעצב כלים אמבידקסטרים שיתאימו לשימוש של שמאליים וימניים
                                מכיוון שרוב הכלים היום מתאימים לשימוש של ימניים בלבד.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                מטרה נוספת:<br />
                                היא לאפשר לימני להחליף ידיים: בעצם תנועה חוזרנית גורמת לעומס
                                יתר אם לא מחליפים ידיים וכאשר מחליפים ידיים זה גורם להפחתת גורם סיכון ופיזור הסיכון הפיזיקלי בשתי הידיים.
                                ובנוסף רווח פיזיולוגי וקוגנטיבי (יכולות שכליות) - בעיקר לימני כי שמאלי רגיל להחליף ידיים כל חייו.
                            </p>
                        </Typography>
                        <Typography align={matchesMD ? 'center' : undefined} variant='subtitle1'>
                            <p dir='rtl'>
                                בפרויקט שלי - בחרתי מוצרים קיימים בשוק ובעזרת שינויים קטנים התאמתי
                                 את הכלים במטרה שיתאימו גם למשתמשים שמאליים.
                                בגלל שבחרתי חמישה כלים, הייתי צריכה להתייחס
                                לא רק לכל אחד בנפרד אלא גם לכולם ביחד כמשפחה ולייצר איזשהי שפה משותפת בין כולם.
                                הדברים שבחרתי להתייחס אליהם כגורמים מאחדים הם:
                                בבחירת הצבע שחוזר בכולם אבל גם מתייחס לאופי של המוצרים שמיועדים לשימוש
                                 יותר חובבני ולא מקצועי, הצבע משדר רכות. פילטים שנתנו אופי רך
                                 לאזורים הפלסטיים לעומת אופי חד באזורים המתכתיים. לייצר סימטריה מלאה לכל כלי שמתאימה לשני המשתמשים.
                                לוגו שקיבל התייחסות שונה בהתאם לחומר עליו הוא מיושם - פלסטיק או מתכת.
                                אחרי שיצרתי מכנה משותף בין המוצרים, התחלתי להתעסק פרטנית בכל כלי ובדרישות שלו.
                            </p>
                        </Typography>
                        <Button
                            variant='contained'
                            className={classes.learnButton}
                            style={{marginBottom: matchesSM ? '1em' : '5em'}}
                            onClick={() => { navigate('/products')}}
                        >
                            <span>Products</span>
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
         </Grid>
    );
};