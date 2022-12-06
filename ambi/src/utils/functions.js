import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import productsImg from '../assets/Products1.jpg';
import caliper1 from '../assets/Caliper1.jpg';
import caliper2 from '../assets/Caliper2.jpg';
import measureTape1 from '../assets/MeasureTape1.jpg';
import measureTape2 from '../assets/MeasureTape2.jpg';
import ruler1 from '../assets/Ruler1.jpg';
import ruler2 from '../assets/Ruler2.jpg';
import scissors1 from '../assets/Scissors1.jpg';
import scissors2 from '../assets/Scissors2.jpg';
import utilityKnife1 from '../assets/UtilityKnife1.jpg';
import utilityKnife2 from '../assets/UtilityKnife2.jpg';

export const getProductData = (productName, productsArray) => {
    let result;
    productsArray.forEach((product) => {
        if (productName === product.name) {
            result = product;
        }
    })
    return result;
};

export const renderImage1 = (productName, classes) => {
    switch (productName){
        case 'Caliper':
            return (
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={caliper2}
                        alt='caliper2 image'
                    />
                </Card>
                );
    
        case 'Measure Tape':
            return (
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={measureTape1}
                        alt='measureTape1 image'
                    />
                </Card>
                );
    
        case 'Ruler':
            return (
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={ruler1}
                        alt='ruler1 image'
                    />
                </Card>
                );
    
        case 'Scissors':
            return (
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={scissors1}
                        alt='rulscissors1er1 image'
                    />
                </Card>
                );
    
        case 'Utility Knife':
            return (
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={utilityKnife2}
                        alt='utilityKnife2 image'
                    />
                </Card>
                );
    
        default:
            return (
                <CardMedia
                    className={classes.productImage}
                    component='img'
                    image={productsImg}
                    alt='productsImg image'
                />
                );
    }
};

export const renderImage2 = (productName, classes) => {
    switch (productName){
        case 'Caliper':
            return (
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={caliper1}
                        alt='caliper1 image'
                    />
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={caliper2}
                        alt='caliper2 image'
                    />
                </Card>
                );
    
        case 'Measure Tape':
            return (
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={measureTape1}
                        alt='measureTape1 image'
                    />
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={measureTape2}
                        alt='measureTape2 image'
                    />
                </Card>
                );
    
        case 'Ruler':
            return (
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={ruler1}
                        alt='ruler1 image'
                    />
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={ruler2}
                        alt='ruler2 image'
                    />
                </Card>
                );
    
        case 'Scissors':
            return (
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={scissors1}
                        alt='rulscissors1er1 image'
                    />
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={scissors2}
                        alt='scissors2 image'
                    />
                </Card>
                );
    
        case 'Utility Knife':
            return (
                <Card className={classes.cardContainer} style={{backgroundColor: 'transparent'}}>
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={utilityKnife1}
                        alt='utilityKnife1 image'
                    />
                    <CardMedia
                        className={classes.productImage}
                        component='img'
                        image={utilityKnife2}
                        alt='utilityKnife2 image'
                    />
                </Card>
                );
    
        default:
            return (
                <CardMedia
                    className={classes.productImage}
                    component='img'
                    image={productsImg}
                    alt='productsImg image'
                />
                );
    }
};