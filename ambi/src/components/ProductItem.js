import React from 'react';
import { makeStyles, useTheme } from '@mui/styles';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

const useStyles = makeStyles(theme => ({
    productItemContainer: {
        display: 'inline-block',
        position: 'center',
        marginBottom: '20px',
        backgroundColor: 'transparent',
        boxShadow: theme.shadows[10],
        borderRadius: 15,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: 0,
            paddingRight: 0,
            borderRadius: 0,
            width: '100%'
        }
    }
}));

export default function ProductItem({ productName, description, link }) {
    const classes = useStyles();
    let navigate = useNavigate();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Card 
            className={classes.productItemContainer} 
            sx={{ minWidth: matchesSM ? undefined : 500, maxWidth: 500 }}
            style={{backgroundColor: 'transparent'}}
        >
            <CardContent>
                <Typography style={{textAlign: 'center'}} variant='h4'>{productName}</Typography>
                <Typography style={{marginRight: '20px', marginLeft: '20px'}} variant='subtitle1'>
                    <p dir='rtl'>{description}</p>
                </Typography>
            </CardContent>

            <CardActions>
                <Button 
                    variant='text' 
                    onClick={() => navigate(link)}
                    style={{marginBottom: matchesSM ? '1em' : '2em'}}
                >Learm More</Button>
            </CardActions>

        </Card>
    );
}